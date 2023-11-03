const { gptRecommendation } = require("../utils/gptRecommendations");
const { getSensorsData } = require("../utils/getSensorData");

async function gptRecommend(req, res) {
  try {
    console.log("hello1");
    const sensorData = await getSensorsData(1);
    console.log("hello2");
    const moisture = sensorData[0]._value;
    const nitrogen = sensorData[1]._value;
    const phosphorous = sensorData[2]._value;
    const potassium = sensorData[3]._value;
    const temperature = sensorData[4]._value;
    const ph = sensorData[5]._value;
    console.log("hello3");
    const promptToSend = `My soil composition: Nitrogen: ${nitrogen} P: ${phosphorous} K: ${potassium} Temperature: ${temperature} Moisture: ${moisture} Water pH: ${ph}. Please provide sustainable crops to grow, I know it depends on various other factors as well, just give me the list of most appropriate crops to grow. LIMIT response to 1500 characters.`;
    let suggestion;
    let sustainabilitySuggestion;
    try {
      sustainabilitySuggestion = `Improving soil quality is crucial for better plant growth, health, and productivity. Here are some sustainable steps you can consider to improve your soil based on the provided composition and conditions:
1. Balancing Nutrients:
   - Your soil has relatively high levels of Nitrogen (N) compared to Phosphorus (P) and Potassium (K). It's essential to have a balanced N-P-K ratio for better plant growth.
   - Consider adding phosphorus and potassium-rich amendments like bone meal, rock phosphate, or greensand to balance the nutrients.
   - Conduct regular soil tests to monitor nutrient levels and adjust amendments accordingly.
2. Organic Matter and Composting:
   - Incorporate well-rotted compost, aged manure, or other organic matter into the soil to improve its structure and nutrient content.
   - Composting kitchen and garden waste can provide a continuous source of organic matter.
3. Cover Cropping and Green Manures:
   - Grow cover crops like clover or vetch during off-seasons to prevent soil erosion, suppress weeds, and add organic matter when tilled into the soil.
   - Green manures, like legumes, can fix atmospheric nitrogen in the soil, improving its nitrogen content.
4. Crop Rotation:
   - Practice crop rotation to prevent soil nutrient depletion and to disrupt the life cycle of soil pests and diseases.
5. Mulching:
   - Apply a layer of organic mulch like straw or leaves on the soil surface to retain moisture, regulate temperature, and add organic matter as it decomposes.
6. Water Management:
   - Your soil moisture is quite high at ${moisture}%. Ensure proper drainage to prevent waterlogging, which can lead to root rot and other problems.
   - Maintain a slightly acidic to neutral pH (6.0 to 7.0) for water, as a pH of ${ph} is within a suitable range.
7. Microbial Inoculants:
   - Consider adding microbial inoculants to enhance soil microbial activity, which helps in nutrient cycling and improving soil structure.
8. Reducing Soil Compaction:
   - Avoid over-tilling and heavy machinery that can lead to soil compaction.
   - Use a broadfork or other hand tools to aerate the soil, improving root penetration and water infiltration.
9. Education and Monitoring:
   - Stay informed about sustainable soil management practices.
   - Monitor soil health over time by conducting regular soil tests, and adjust your practices as necessary based on the results.
10. Seeking Professional Advice:
    - Consider consulting with local agricultural extension services or soil scientists to get personalized advice based on your soil conditions and goals.`;
   suggestion = await gptRecommendation(promptToSend);
    }
    catch (error) {
      console.error('Error fetching suggestions:', error);
      suggestion = "Error fetching suggestions";
    }
    console.log("hello4");
    res.status(200).json({ suggestion, sustainabilitySuggestion });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: error.message });
  }
}


module.exports = { gptRecommend };
