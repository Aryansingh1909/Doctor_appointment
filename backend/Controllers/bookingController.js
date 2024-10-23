import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import Stripe from 'stripe';

export const getCheckoutSession = async (req, res) => { 
    try {
        const doctor = await Doctor.findById(req.params.doctorId);
        
        const user = await User.findById(req.userId);
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
                cancel_url: `${req.protocol}://${req.get('host')}/doctors/${doctor.id}`,
            customer_email: user.email,
            client_reference_id: req.params.doctorId,
            line_items: [{
                price_data: {
                    currency: 'inr',
                    unit_amount: doctor.ticketPrice * 100,
                    product_data: {
                        name: doctor.name,
                        description: doctor.bio, 
                        images: [doctor.photo]
                    }
                },  
                quantity: 1
            }]
        });
        const booking = new Booking({
            doctor: doctor._id,
            user: user._id,
            ticketPrice: doctor.ticketPrice,
            session: session.id
        });
        await booking.save();
        res.status(200).json({ success: true, message: 'Successfully Paid', session }); 
    } catch (error) {
        
        res.status(500).json({ success: false, message: 'Error creating checkout session'}); 
    }
};


// import User from "../models/UserSchema.js";
// import Doctor from "../models/DoctorSchema.js";
// import Booking from "../models/BookingSchema.js";
// import Razorpay from 'razorpay';

// export const getCheckoutSession = async (req, res) => { 
//     try {
//         const doctor = await Doctor.findById(req.params.doctorId);
//         const user = await User.findById(req.userId);

//         // Razorpay instance
//         const razorpay = new Razorpay({
//             key_id: process.env.RAZORPAY_KEY_ID,
//             key_secret: process.env.RAZORPAY_SECRET_KEY,
//         });

//         // Create an order in Razorpay
//         const orderOptions = {
//             amount: doctor.ticketPrice * 100, // amount in smallest currency unit (paise for INR)
//             currency: "INR",
//             receipt: `receipt_${doctor._id}_${user._id}`,
//             payment_capture: 1 // auto-capture payment
//         };

//         const order = await razorpay.orders.create(orderOptions);

//         // Save the booking details
//         const booking = new Booking({
//             doctor: doctor._id,
//             user: user._id,
//             ticketPrice: doctor.ticketPrice,
//             session: order.id
//         });
//         await booking.save();

//         // Send success response with order details
//         res.status(200).json({
//             success: true,
//             message: 'Order created successfully',
//             order_id: order.id,
//             amount: order.amount,
//             currency: order.currency,
//             doctor: {
//                 name: doctor.name,
//                 bio: doctor.bio,
//                 photo: doctor.photo
//             }
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Error creating Razorpay order',
//             error: error.message
//         });
//     }
// };
