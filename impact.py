"""
This section is for the amount of impact the user has had if they used our app, it queries the user database by email 
"""
from models import *
from flask import jsonify
from sqlalchemy.sql import func  

"""
Environmental Impact of Using Reusable Plates and Cutlery

A) Calculating Waste Saved:
   We'll assume an average weight for each type of disposable item:
   - Plastic container: ~0.04 lbs (18 grams)
   - Plastic fork/spoon: ~0.008 lbs (3.5 grams)
   - Plastic knife: ~0.008 lbs (3.5 grams)

   For a user eating out 7 times, the formula for calculating the waste saved is:

   1. Calculating the total weight saved:
      - Number of containers saved: 7
      - Number of utensils saved: 7-14 forks/spoons/knives, depending on whether they use 1 or 2 per meal.

      The formula would look like this:
      Total waste saved (lbs) = (containers saved * avg weight of container) + (utensils saved * avg weight of utensil)

      Assuming they use 1 set of cutlery (fork, spoon, knife) per meal:
      Total waste saved = (7 * 0.04) + (14 * 0.008) = 0.28 + 0.112 = 0.392 lbs

      So, using reusable plates instead of disposable plastic ones for 7 meals saves about 0.392 lbs of plastic waste.

B) Estimating the Number of Animals Potentially Saved:
   - It is estimated that 1 million marine animals are killed each year due to plastic waste.
   - An average of 8 million metric tons (17.6 billion lbs) of plastic waste enters the ocean annually.
   - Using this, we can estimate:
      Animals potentially saved per lb of waste avoided = 1,000,000 animals / 17,600,000,000 lbs
      ≈ 0.000057 animals per lb

      Animals potentially saved = Total waste saved * 0.000057
      = 0.392 * 0.000057 ≈ 0.000022 animals

      This is a very rough estimation, but it highlights that while the impact of a single person’s choices might seem small, the cumulative effect over many people can be significant.

C) Additional Quantifiable Benefits of Using Reusable Items:
   1. Reduction in Carbon Footprint:
      - Plastic production emits around 6 kg of CO₂ per kg of plastic produced.
      - For 0.392 lbs (0.18 kg) of plastic saved:
         CO₂ savings = 0.18 kg * 6 kg CO₂/kg ≈ 1.08 kg CO₂
         So, using reusable items for 7 meals can save about 1.08 kg (2.38 lbs) of CO₂ emissions.

   2. Energy Savings:
      - Producing 1 kg of plastic requires around 62-108 MJ of energy (17.2-30 kWh).
      - By avoiding 0.18 kg of plastic waste:
         Energy savings = 0.18 * 62 ≈ 11.16 MJ (3.1 kWh)
         This is roughly equivalent to powering a standard light bulb for about 30-40 hours.

   3. Reduction in Ocean Pollution:
      - Around 80% of ocean plastic waste comes from land-based sources, including discarded single-use plastics.
      - By reducing the use of plastic, the user contributes to lessening the amount of waste that could reach oceans, impacting not just marine life but the entire food chain.

   4. Reduced Landfill Waste:
      - Discarded plastics take hundreds of years to decompose in landfills, potentially releasing harmful chemicals into the soil and groundwater.
      - Each use of reusable items helps reduce this burden.

   5. Water Conservation:
      - Though reusable items require water for washing, the production of single-use plastics also involves significant water consumption.
      - For example, manufacturing a single plastic bottle can use up to 2 gallons of water.
      - The cumulative water savings can be substantial when considering large-scale usage.

   These calculations and metrics help make the environmental benefits of using reusable items more tangible.
   By emphasizing these, users can be better motivated to adopt sustainable practices.
"""
def getWasteSaved(numberOfPlates):
   if not numberOfPlates:
      return 0
   # Constants for calculations
   avg_weight_container = 0.04  # in lbs (weight of a disposable plastic container)
   avg_weight_utensil = 0.008  # in lbs (weight of a disposable plastic utensil)
   utensils_per_meal = 2  # average utensils used per meal (fork and spoon)
   return (numberOfPlates * avg_weight_container) + (numberOfPlates * utensils_per_meal * avg_weight_utensil)

def getCO2Savings(waste_saved):
   return waste_saved * 0.453592 * 6  # in kg of CO₂

def getEnergySavings(waste_saved):
   return waste_saved * 0.453592 * 62  # in MJ

def getUserImpact(email):
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'Error': 'User not found'}), 404  # Return 404 if user does not exist

    # Grab the number of orders the user had (represents the number of plates)
    numberOfPlates = user.number_of_orders

    waste_saved = getWasteSaved(numberOfPlates)
    co2_savings = getCO2Savings(waste_saved)
    energy_savings = getEnergySavings(waste_saved)
    landfill_waste_saved = numberOfPlates
    '''
    # Constants for calculations
    avg_weight_container = 0.04  # in lbs (weight of a disposable plastic container)
    avg_weight_utensil = 0.008  # in lbs (weight of a disposable plastic utensil)
    utensils_per_meal = 2  # average utensils used per meal (fork and spoon)
    
    # Calculate waste saved in lbs
    waste_saved = (numberOfPlates * avg_weight_container) + (numberOfPlates * utensils_per_meal * avg_weight_utensil)

    # Calculate CO₂ savings (6 kg of CO₂ per kg of plastic)
    # 1 lb = 0.453592 kg, so we convert waste saved to kg for this calculation
    co2_savings = waste_saved * 0.453592 * 6  # in kg of CO₂

    # Calculate energy savings (62 MJ per kg of plastic)
    energy_savings = waste_saved * 0.453592 * 62  # in MJ

    # Reduction in landfill waste
    # The number of plates saved equals the number of meals with reusable plates
    landfill_waste_saved = numberOfPlates  # in terms of number of plates avoided
   '''
    # Return the user's environmental impact
    return jsonify({
        'email': email,
        'waste_saved_lbs': round(waste_saved, 3),
        'co2_savings_kg': round(co2_savings, 3),
        'energy_savings_mj': round(energy_savings, 2),
        'landfill_waste_saved_plates': landfill_waste_saved
    }), 200

def getVendorImpact():
    vendors = Vendor.query.all()
    vendor = vendors[0]
    numberOfPlates = db.session.query(func.sum(User.number_of_orders)).scalar()
    '''
    if not user:
        return jsonify({'Error': 'User not found'}), 404  # Return 404 if user does not exist
    '''

    waste_saved = getWasteSaved(numberOfPlates)
    co2_savings = getCO2Savings(waste_saved)
    energy_savings = getEnergySavings(waste_saved)
    landfill_waste_saved = numberOfPlates
    #print(numberOfPlates)
    #print(round(waste_saved,3))
    #print(round(co2_savings,3))
    #print(round(energy_savings,2))
    #print(landfill_waste_saved)
    # Grab the number of orders the user had (represents the number of plates)
    #numberOfPlates = user.number_of_orders
    # Return the user's environmental impact
    return jsonify({
        'store_name' : vendor.store_name,
        'first_name': vendor.first_name,
        'last_name': vendor.last_name,
        'waste_saved_lbs': round(waste_saved, 3),
        'co2_savings_kg': round(co2_savings, 3),
        'energy_savings_mj': round(energy_savings, 2),
        'landfill_waste_saved_plates': landfill_waste_saved
    }), 200