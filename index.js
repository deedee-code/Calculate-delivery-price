const express = require("express");

const app = express()

const port = 3500

// Pricing rate for different regions (per kilometer)
const regions = {
    mainland: 150,
    island: 200,
    ajah: 130,
    ikorodu: 110,
};


// Function to calculate delivery price base on distance and location
function calculateDeliveryPrice(distanceInKm, location) {
    const ratePerKm = regions[location] || 100; // Default to a flat rate if location not found
    return distanceInKm * ratePerKm;
}


// Endpoint for delivery price
app.get('/delivery-price', async (req, res) => {
    try {
        const { from, destination, distance } = req.query;

        // Check if required parameters are provided
        if (!from || !destination || !distance) {
            return res.status(400).json({ error: 'Missing parameters' });
        }

        // Check if the location is within the state
        if (!regions[from] || !regions[destination]) {
            return res.status(400).json({ error: 'Unrecognised locations' });
        }

        // Calculate delivery price
        const deliveryPrice = calculateDeliveryPrice(parseFloat(distance), from);

        // Return the delivery price
        res.status(200).json({ message: "Delivery Price Fetched Successfully...", from, destination, distance, deliveryPrice });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error!" })
    }
})


app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
})

