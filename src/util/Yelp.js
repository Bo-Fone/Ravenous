const apiKey =
    'vdaFcXdaZyENXNg_ctZFpMZoGWmYGNdfLc_FmsL6-3zrl7vDlNSQg7ekjgSS5fnUOIEClcVd0MN-jVT1k_Lg5gur41BEEPLMF5tLlLDFkcTWDTMxDfoGUUmLyuLzXXYx';

const Yelp = {
    search: async function(term, location, sortBy) {
        const response = await fetch(
            `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
            {
                headers: { Authorization: `Bearer ${apiKey}` },
            },
        );
        const jsonResponse = await response.json();
        if (jsonResponse.businesses) {
            return jsonResponse.businesses.map(business => {
                return {
                    id: business.id,
                    imageSrc: business.image_url,
                    name: business.name,
                    address: business.location.address1,
                    city: business.location.city,
                    state: business.location.state,
                    zipCode: business.location.zip_code,
                    category: business.categories[0].title,
                    rating: business.rating,
                    reviewCount: business.review_count,
                };
            });
        } else {
            console.log(
                jsonResponse.errors.map(error => {
                    return `${error.error_code} \n ${error.error_message} \n ${error.more_info}`;
                }),
            );
        }
    },
};

export default Yelp;
