## **Singa Metro Authority (SMA) Fare Calculator**
This project implements a fare calculation system for Singa Metro Authority's (SMA) public transport. Commuters can calculate their total fares based on the lines traveled, time of travel (peak/non-peak), and daily/weekly fare caps. The design is flexible, enabling the future addition of new lines, rules, and stations. Most metro systems utilize smartcards to track individual passenger journeys and apply the fare calculations automatically. 

## **🚀 Features**
- **Dynamic Fare Calculation**: Calculates fares based on the line combinations  and peak/non-peak hour rules.
- **Fare Caps**: Implements daily and weekly caps to ensure fair pricing.
- **CSV Input Suppor**t: Reads journey data from a CSV file for bulk fare processing.
- **Configurable Peak Hours**: Peak hours are defined in a centralized configuration file for easy updates.
- **Scalable Architecture**: Easily extendable to handle new fare rules, lines, and stations.


## **⚙️ Installation and Setup**

   1. Clone the repository: **`git clone https://github.com/FelixFelicis555/sma-fare-calculator.git`**
  2. Navigate to the project directory: **` cd sma-fare-calculator`**
  3. Install dependencies: **`npm install`**
  4. Run the Script: **`node index.js`**

## **🧩 How It Works**
  1. Input:
     - A CSV file (journeys.csv) with each row containing:
        - `FromLine`: Starting metro line (e.g., Green, Red).
        -  `ToLine`: Ending metro line (e.g., Green, Red).
        -  `datetime`: Date and time of travel (e.g., 2025-01-24T08:30:00).
  2. Fare Calculation:
     - Based on the FromLine and ToLine, the fare is determined by predefined peak and non-peak rates.
     - If the journey occurs during peak hours, peak rates are applied; otherwise, non-peak rates are used.
  3.  Fare Capping:
      - Daily and weekly caps are enforced to limit maximum charges.
      - The fare calculation keeps track of daily and weekly totals for individual commuters.
  4.  Output:
      - Displays the calculated fare for each journey and the total fare applied across all journeys

        
## **🚧 Ongoing Work🛠️**
 - **Testing**: We are in the process of adding unit and integration tests to ensure the reliability of the application.
 - **Input Validation**: Enhancements for input validation are underway to ensure robust data handling and better error management.
 - **Exception-Handling/Error-Handling**: The goal is to catch edge cases, invalid inputs, and unexpected scenarios with informative error messages and graceful fallbacks.

## **Other Design-Patterns**
- **`Strategy Pattern`**:  This will help us define different fare strategies based on the combination of lines (Green -> Green, Green -> Red, etc.) and whether it's peak or non-peak time.
- **`State Pattern`**:    We can use this to track and apply daily and weekly caps, as fare capping changes based on the user's cumulative fare.
- **`Factory Pattern`**:  This will help us create different fare strategy objects depending on the lines being travele

## **Future Scope**
 1.  Advanced Fare Calculation Features
 2.  Integration with External Systems
 3.  Advanced User Personalization
 4.  Enhanced Reporting and Analytics

