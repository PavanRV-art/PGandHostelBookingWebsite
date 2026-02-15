// GET /api/user
export const getUserData = async (req, res) => {
    try {
        const { role, recentSearchedCities } = req.user;

        res.json({
            success: true,
            role,
            recentSearchedCities
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Store User Recent Searched Cities
export const storeRecentSearchedCities = async (req, res) => {
    try {
        const { recentSearchedCity } = req.body;
        const user = req.user;

        if (!recentSearchedCity) {
            return res.status(400).json({
                success: false,
                message: "City is required"
            });
        }

        // Remove if already exists (avoid duplicates)
        user.recentSearchedCities = user.recentSearchedCities.filter(
            city => city !== recentSearchedCity
        );

        // Add to end
        user.recentSearchedCities.push(recentSearchedCity);

        // Keep only last 3 cities
        if (user.recentSearchedCities.length > 3) {
            user.recentSearchedCities.shift();
        }

        await user.save();

        res.json({
            success: true,
            message: "City added successfully",
            recentSearchedCities: user.recentSearchedCities
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// -----------------------------------------------------------------------------------------------
