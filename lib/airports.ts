// Common airports data for autocomplete
export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

// Comprehensive airports database - All major airports worldwide
export const AIRPORTS: Airport[] = [
  // United States - Major Hubs
  { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International', city: 'Atlanta', country: 'United States' },
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'United States' },
  { code: 'ORD', name: "O'Hare International", city: 'Chicago', country: 'United States' },
  { code: 'DFW', name: 'Dallas/Fort Worth International', city: 'Dallas', country: 'United States' },
  { code: 'DEN', name: 'Denver International', city: 'Denver', country: 'United States' },
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'United States' },
  { code: 'SFO', name: 'San Francisco International', city: 'San Francisco', country: 'United States' },
  { code: 'SEA', name: 'Seattle-Tacoma International', city: 'Seattle', country: 'United States' },
  { code: 'LAS', name: 'Harry Reid International', city: 'Las Vegas', country: 'United States' },
  { code: 'MIA', name: 'Miami International', city: 'Miami', country: 'United States' },
  { code: 'CLT', name: 'Charlotte Douglas International', city: 'Charlotte', country: 'United States' },
  { code: 'PHX', name: 'Phoenix Sky Harbor International', city: 'Phoenix', country: 'United States' },
  { code: 'EWR', name: 'Newark Liberty International', city: 'Newark', country: 'United States' },
  { code: 'IAH', name: 'George Bush Intercontinental', city: 'Houston', country: 'United States' },
  { code: 'MCO', name: 'Orlando International', city: 'Orlando', country: 'United States' },
  { code: 'MSP', name: 'Minneapolis-Saint Paul International', city: 'Minneapolis', country: 'United States' },
  { code: 'DTW', name: 'Detroit Metropolitan', city: 'Detroit', country: 'United States' },
  { code: 'PHL', name: 'Philadelphia International', city: 'Philadelphia', country: 'United States' },
  { code: 'LGA', name: 'LaGuardia', city: 'New York', country: 'United States' },
  { code: 'BWI', name: 'Baltimore/Washington International', city: 'Baltimore', country: 'United States' },
  { code: 'SLC', name: 'Salt Lake City International', city: 'Salt Lake City', country: 'United States' },
  { code: 'DCA', name: 'Ronald Reagan Washington National', city: 'Washington', country: 'United States' },
  { code: 'MDW', name: 'Chicago Midway International', city: 'Chicago', country: 'United States' },
  { code: 'HNL', name: 'Daniel K. Inouye International', city: 'Honolulu', country: 'United States' },
  { code: 'BOS', name: 'Logan International', city: 'Boston', country: 'United States' },
  { code: 'FLL', name: 'Fort Lauderdale-Hollywood International', city: 'Fort Lauderdale', country: 'United States' },
  { code: 'IAD', name: 'Washington Dulles International', city: 'Washington', country: 'United States' },
  { code: 'SAN', name: 'San Diego International', city: 'San Diego', country: 'United States' },
  { code: 'TPA', name: 'Tampa International', city: 'Tampa', country: 'United States' },
  { code: 'PDX', name: 'Portland International', city: 'Portland', country: 'United States' },
  { code: 'STL', name: 'St. Louis Lambert International', city: 'St. Louis', country: 'United States' },
  { code: 'AUS', name: 'Austin-Bergstrom International', city: 'Austin', country: 'United States' },
  { code: 'BNA', name: 'Nashville International', city: 'Nashville', country: 'United States' },
  { code: 'RDU', name: 'Raleigh-Durham International', city: 'Raleigh', country: 'United States' },
  { code: 'IND', name: 'Indianapolis International', city: 'Indianapolis', country: 'United States' },
  { code: 'CLE', name: 'Cleveland Hopkins International', city: 'Cleveland', country: 'United States' },
  { code: 'CMH', name: 'John Glenn Columbus International', city: 'Columbus', country: 'United States' },
  { code: 'MCI', name: 'Kansas City International', city: 'Kansas City', country: 'United States' },
  { code: 'OAK', name: 'Oakland International', city: 'Oakland', country: 'United States' },
  { code: 'SJC', name: 'Norman Y. Mineta San Jose International', city: 'San Jose', country: 'United States' },
  { code: 'SMF', name: 'Sacramento International', city: 'Sacramento', country: 'United States' },
  { code: 'SNA', name: 'John Wayne Airport', city: 'Santa Ana', country: 'United States' },
  { code: 'BUR', name: 'Hollywood Burbank Airport', city: 'Burbank', country: 'United States' },
  { code: 'ONT', name: 'Ontario International', city: 'Ontario', country: 'United States' },
  { code: 'JAX', name: 'Jacksonville International', city: 'Jacksonville', country: 'United States' },
  { code: 'MSY', name: 'Louis Armstrong New Orleans International', city: 'New Orleans', country: 'United States' },
  { code: 'PIT', name: 'Pittsburgh International', city: 'Pittsburgh', country: 'United States' },
  { code: 'CVG', name: 'Cincinnati/Northern Kentucky International', city: 'Cincinnati', country: 'United States' },
  { code: 'MEM', name: 'Memphis International', city: 'Memphis', country: 'United States' },
  { code: 'MKE', name: 'Milwaukee Mitchell International', city: 'Milwaukee', country: 'United States' },
  { code: 'OGG', name: 'Kahului Airport', city: 'Kahului', country: 'United States' },
  { code: 'KOA', name: 'Kona International', city: 'Kailua-Kona', country: 'United States' },
  { code: 'LIH', name: 'Lihue Airport', city: 'Lihue', country: 'United States' },
  
  // Canada
  { code: 'YYZ', name: 'Toronto Pearson International', city: 'Toronto', country: 'Canada' },
  { code: 'YVR', name: 'Vancouver International', city: 'Vancouver', country: 'Canada' },
  { code: 'YUL', name: 'Montréal–Trudeau International', city: 'Montreal', country: 'Canada' },
  { code: 'YYC', name: 'Calgary International', city: 'Calgary', country: 'Canada' },
  { code: 'YEG', name: 'Edmonton International', city: 'Edmonton', country: 'Canada' },
  { code: 'YOW', name: 'Ottawa Macdonald–Cartier International', city: 'Ottawa', country: 'Canada' },
  { code: 'YHZ', name: 'Halifax Stanfield International', city: 'Halifax', country: 'Canada' },
  { code: 'YWG', name: 'Winnipeg James Armstrong Richardson International', city: 'Winnipeg', country: 'Canada' },
  { code: 'YQB', name: 'Québec City Jean Lesage International', city: 'Quebec City', country: 'Canada' },
  { code: 'YQM', name: 'Greater Moncton Roméo LeBlanc International', city: 'Moncton', country: 'Canada' },
  
  // United Kingdom
  { code: 'LHR', name: 'Heathrow', city: 'London', country: 'United Kingdom' },
  { code: 'LGW', name: 'Gatwick', city: 'London', country: 'United Kingdom' },
  { code: 'STN', name: 'London Stansted', city: 'London', country: 'United Kingdom' },
  { code: 'LTN', name: 'London Luton', city: 'London', country: 'United Kingdom' },
  { code: 'MAN', name: 'Manchester', city: 'Manchester', country: 'United Kingdom' },
  { code: 'EDI', name: 'Edinburgh', city: 'Edinburgh', country: 'United Kingdom' },
  { code: 'BHX', name: 'Birmingham', city: 'Birmingham', country: 'United Kingdom' },
  { code: 'GLA', name: 'Glasgow', city: 'Glasgow', country: 'United Kingdom' },
  { code: 'BRS', name: 'Bristol', city: 'Bristol', country: 'United Kingdom' },
  { code: 'NCL', name: 'Newcastle', city: 'Newcastle', country: 'United Kingdom' },
  { code: 'LPL', name: 'Liverpool John Lennon', city: 'Liverpool', country: 'United Kingdom' },
  { code: 'BFS', name: 'Belfast International', city: 'Belfast', country: 'United Kingdom' },
  
  // France
  { code: 'CDG', name: 'Charles de Gaulle', city: 'Paris', country: 'France' },
  { code: 'ORY', name: 'Orly', city: 'Paris', country: 'France' },
  { code: 'LYS', name: 'Lyon–Saint-Exupéry', city: 'Lyon', country: 'France' },
  { code: 'MRS', name: 'Marseille Provence', city: 'Marseille', country: 'France' },
  { code: 'NCE', name: 'Nice Côte d\'Azur', city: 'Nice', country: 'France' },
  { code: 'TLS', name: 'Toulouse–Blagnac', city: 'Toulouse', country: 'France' },
  { code: 'BOD', name: 'Bordeaux–Mérignac', city: 'Bordeaux', country: 'France' },
  { code: 'NTE', name: 'Nantes Atlantique', city: 'Nantes', country: 'France' },
  { code: 'SXB', name: 'Strasbourg', city: 'Strasbourg', country: 'France' },
  { code: 'LIL', name: 'Lille', city: 'Lille', country: 'France' },
  
  // Germany
  { code: 'FRA', name: 'Frankfurt am Main', city: 'Frankfurt', country: 'Germany' },
  { code: 'MUC', name: 'Munich', city: 'Munich', country: 'Germany' },
  { code: 'BER', name: 'Berlin Brandenburg', city: 'Berlin', country: 'Germany' },
  { code: 'HAM', name: 'Hamburg', city: 'Hamburg', country: 'Germany' },
  { code: 'DUS', name: 'Düsseldorf', city: 'Düsseldorf', country: 'Germany' },
  { code: 'STR', name: 'Stuttgart', city: 'Stuttgart', country: 'Germany' },
  { code: 'CGN', name: 'Cologne Bonn', city: 'Cologne', country: 'Germany' },
  { code: 'HAJ', name: 'Hannover', city: 'Hannover', country: 'Germany' },
  { code: 'NUE', name: 'Nuremberg', city: 'Nuremberg', country: 'Germany' },
  { code: 'LEJ', name: 'Leipzig/Halle', city: 'Leipzig', country: 'Germany' },
  
  // Spain
  { code: 'MAD', name: 'Adolfo Suárez Madrid–Barajas', city: 'Madrid', country: 'Spain' },
  { code: 'BCN', name: 'Barcelona–El Prat', city: 'Barcelona', country: 'Spain' },
  { code: 'PMI', name: 'Palma de Mallorca', city: 'Palma', country: 'Spain' },
  { code: 'AGP', name: 'Málaga–Costa del Sol', city: 'Málaga', country: 'Spain' },
  { code: 'VLC', name: 'Valencia', city: 'Valencia', country: 'Spain' },
  { code: 'SVQ', name: 'Seville', city: 'Seville', country: 'Spain' },
  { code: 'BIO', name: 'Bilbao', city: 'Bilbao', country: 'Spain' },
  { code: 'ALC', name: 'Alicante–Elche', city: 'Alicante', country: 'Spain' },
  { code: 'IBZ', name: 'Ibiza', city: 'Ibiza', country: 'Spain' },
  { code: 'LPA', name: 'Gran Canaria', city: 'Las Palmas', country: 'Spain' },
  
  // Italy
  { code: 'FCO', name: 'Leonardo da Vinci–Fiumicino', city: 'Rome', country: 'Italy' },
  { code: 'MXP', name: 'Milan Malpensa', city: 'Milan', country: 'Italy' },
  { code: 'LIN', name: 'Milan Linate', city: 'Milan', country: 'Italy' },
  { code: 'VCE', name: 'Venice Marco Polo', city: 'Venice', country: 'Italy' },
  { code: 'NAP', name: 'Naples', city: 'Naples', country: 'Italy' },
  { code: 'BLQ', name: 'Bologna', city: 'Bologna', country: 'Italy' },
  { code: 'FLR', name: 'Florence', city: 'Florence', country: 'Italy' },
  { code: 'TRN', name: 'Turin', city: 'Turin', country: 'Italy' },
  { code: 'GOA', name: 'Genoa', city: 'Genoa', country: 'Italy' },
  { code: 'PSA', name: 'Pisa', city: 'Pisa', country: 'Italy' },
  
  // Netherlands
  { code: 'AMS', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands' },
  { code: 'RTM', name: 'Rotterdam The Hague', city: 'Rotterdam', country: 'Netherlands' },
  { code: 'EIN', name: 'Eindhoven', city: 'Eindhoven', country: 'Netherlands' },
  
  // Switzerland
  { code: 'ZRH', name: 'Zurich', city: 'Zurich', country: 'Switzerland' },
  { code: 'GVA', name: 'Geneva', city: 'Geneva', country: 'Switzerland' },
  { code: 'BSL', name: 'EuroAirport Basel Mulhouse Freiburg', city: 'Basel', country: 'Switzerland' },
  
  // Belgium
  { code: 'BRU', name: 'Brussels', city: 'Brussels', country: 'Belgium' },
  { code: 'CRL', name: 'Brussels South Charleroi', city: 'Charleroi', country: 'Belgium' },
  
  // Austria
  { code: 'VIE', name: 'Vienna', city: 'Vienna', country: 'Austria' },
  { code: 'SZG', name: 'Salzburg', city: 'Salzburg', country: 'Austria' },
  
  // Portugal
  { code: 'LIS', name: 'Lisbon', city: 'Lisbon', country: 'Portugal' },
  { code: 'OPO', name: 'Francisco de Sá Carneiro', city: 'Porto', country: 'Portugal' },
  { code: 'FAO', name: 'Faro', city: 'Faro', country: 'Portugal' },
  
  // Greece
  { code: 'ATH', name: 'Athens International', city: 'Athens', country: 'Greece' },
  { code: 'SKG', name: 'Thessaloniki', city: 'Thessaloniki', country: 'Greece' },
  { code: 'HER', name: 'Heraklion', city: 'Heraklion', country: 'Greece' },
  { code: 'RHO', name: 'Rhodes', city: 'Rhodes', country: 'Greece' },
  
  // Scandinavia
  { code: 'CPH', name: 'Copenhagen', city: 'Copenhagen', country: 'Denmark' },
  { code: 'ARN', name: 'Stockholm Arlanda', city: 'Stockholm', country: 'Sweden' },
  { code: 'OSL', name: 'Oslo Gardermoen', city: 'Oslo', country: 'Norway' },
  { code: 'HEL', name: 'Helsinki-Vantaa', city: 'Helsinki', country: 'Finland' },
  { code: 'KEF', name: 'Keflavík', city: 'Reykjavik', country: 'Iceland' },
  
  // Eastern Europe
  { code: 'WAW', name: 'Warsaw Chopin', city: 'Warsaw', country: 'Poland' },
  { code: 'PRG', name: 'Václav Havel Airport Prague', city: 'Prague', country: 'Czech Republic' },
  { code: 'BUD', name: 'Budapest Ferenc Liszt', city: 'Budapest', country: 'Hungary' },
  { code: 'SOF', name: 'Sofia', city: 'Sofia', country: 'Bulgaria' },
  { code: 'OTP', name: 'Henri Coandă International', city: 'Bucharest', country: 'Romania' },
  { code: 'ZAG', name: 'Zagreb', city: 'Zagreb', country: 'Croatia' },
  { code: 'BEG', name: 'Belgrade Nikola Tesla', city: 'Belgrade', country: 'Serbia' },
  
  // Russia & CIS
  { code: 'SVO', name: 'Sheremetyevo', city: 'Moscow', country: 'Russia' },
  { code: 'DME', name: 'Domodedovo', city: 'Moscow', country: 'Russia' },
  { code: 'LED', name: 'Pulkovo', city: 'Saint Petersburg', country: 'Russia' },
  { code: 'KBP', name: 'Boryspil International', city: 'Kyiv', country: 'Ukraine' },
  { code: 'IST', name: 'Istanbul', city: 'Istanbul', country: 'Turkey' },
  { code: 'SAW', name: 'Istanbul Sabiha Gökçen', city: 'Istanbul', country: 'Turkey' },
  { code: 'ESB', name: 'Ankara Esenboğa', city: 'Ankara', country: 'Turkey' },
  
  // Middle East
  { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'United Arab Emirates' },
  { code: 'AUH', name: 'Abu Dhabi International', city: 'Abu Dhabi', country: 'United Arab Emirates' },
  { code: 'DOH', name: 'Hamad International', city: 'Doha', country: 'Qatar' },
  { code: 'BAH', name: 'Bahrain International', city: 'Manama', country: 'Bahrain' },
  { code: 'KWI', name: 'Kuwait International', city: 'Kuwait City', country: 'Kuwait' },
  { code: 'RUH', name: 'King Khalid International', city: 'Riyadh', country: 'Saudi Arabia' },
  { code: 'JED', name: 'King Abdulaziz International', city: 'Jeddah', country: 'Saudi Arabia' },
  { code: 'AMM', name: 'Queen Alia International', city: 'Amman', country: 'Jordan' },
  { code: 'BEY', name: 'Beirut–Rafic Hariri International', city: 'Beirut', country: 'Lebanon' },
  { code: 'TLV', name: 'Ben Gurion', city: 'Tel Aviv', country: 'Israel' },
  
  // Asia - China
  { code: 'PEK', name: 'Beijing Capital International', city: 'Beijing', country: 'China' },
  { code: 'PVG', name: 'Shanghai Pudong International', city: 'Shanghai', country: 'China' },
  { code: 'SHA', name: 'Shanghai Hongqiao International', city: 'Shanghai', country: 'China' },
  { code: 'CAN', name: 'Guangzhou Baiyun International', city: 'Guangzhou', country: 'China' },
  { code: 'SZX', name: 'Shenzhen Bao\'an International', city: 'Shenzhen', country: 'China' },
  { code: 'CTU', name: 'Chengdu Shuangliu International', city: 'Chengdu', country: 'China' },
  { code: 'XIY', name: 'Xi\'an Xianyang International', city: 'Xi\'an', country: 'China' },
  { code: 'KMG', name: 'Kunming Changshui International', city: 'Kunming', country: 'China' },
  { code: 'HGH', name: 'Hangzhou Xiaoshan International', city: 'Hangzhou', country: 'China' },
  { code: 'NKG', name: 'Nanjing Lukou International', city: 'Nanjing', country: 'China' },
  { code: 'TSN', name: 'Tianjin Binhai International', city: 'Tianjin', country: 'China' },
  { code: 'XMN', name: 'Xiamen Gaoqi International', city: 'Xiamen', country: 'China' },
  { code: 'TAO', name: 'Qingdao Liuting International', city: 'Qingdao', country: 'China' },
  { code: 'DLC', name: 'Dalian Zhoushuizi International', city: 'Dalian', country: 'China' },
  { code: 'HKG', name: 'Hong Kong International', city: 'Hong Kong', country: 'Hong Kong' },
  
  // Asia - Japan
  { code: 'NRT', name: 'Narita International', city: 'Tokyo', country: 'Japan' },
  { code: 'HND', name: 'Haneda', city: 'Tokyo', country: 'Japan' },
  { code: 'KIX', name: 'Kansai International', city: 'Osaka', country: 'Japan' },
  { code: 'NGO', name: 'Chubu Centrair International', city: 'Nagoya', country: 'Japan' },
  { code: 'FUK', name: 'Fukuoka', city: 'Fukuoka', country: 'Japan' },
  { code: 'CTS', name: 'New Chitose', city: 'Sapporo', country: 'Japan' },
  { code: 'OKA', name: 'Naha', city: 'Okinawa', country: 'Japan' },
  { code: 'HIJ', name: 'Hiroshima', city: 'Hiroshima', country: 'Japan' },
  { code: 'KOJ', name: 'Kagoshima', city: 'Kagoshima', country: 'Japan' },
  
  // Asia - South Korea
  { code: 'ICN', name: 'Incheon International', city: 'Seoul', country: 'South Korea' },
  { code: 'GMP', name: 'Gimpo International', city: 'Seoul', country: 'South Korea' },
  { code: 'PUS', name: 'Gimhae International', city: 'Busan', country: 'South Korea' },
  { code: 'CJU', name: 'Jeju International', city: 'Jeju', country: 'South Korea' },
  
  // Asia - Southeast Asia
  { code: 'SIN', name: 'Singapore Changi', city: 'Singapore', country: 'Singapore' },
  { code: 'BKK', name: 'Suvarnabhumi', city: 'Bangkok', country: 'Thailand' },
  { code: 'DMK', name: 'Don Mueang International', city: 'Bangkok', country: 'Thailand' },
  { code: 'KUL', name: 'Kuala Lumpur International', city: 'Kuala Lumpur', country: 'Malaysia' },
  { code: 'CGK', name: 'Soekarno–Hatta International', city: 'Jakarta', country: 'Indonesia' },
  { code: 'DPS', name: 'Ngurah Rai International', city: 'Denpasar', country: 'Indonesia' },
  { code: 'MNL', name: 'Ninoy Aquino International', city: 'Manila', country: 'Philippines' },
  { code: 'SGN', name: 'Tan Son Nhat International', city: 'Ho Chi Minh City', country: 'Vietnam' },
  { code: 'HAN', name: 'Noi Bai International', city: 'Hanoi', country: 'Vietnam' },
  { code: 'PNH', name: 'Phnom Penh International', city: 'Phnom Penh', country: 'Cambodia' },
  { code: 'RGN', name: 'Yangon International', city: 'Yangon', country: 'Myanmar' },
  
  // Asia - India
  { code: 'DEL', name: 'Indira Gandhi International', city: 'New Delhi', country: 'India' },
  { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International', city: 'Mumbai', country: 'India' },
  { code: 'BLR', name: 'Kempegowda International', city: 'Bangalore', country: 'India' },
  { code: 'MAA', name: 'Chennai International', city: 'Chennai', country: 'India' },
  { code: 'CCU', name: 'Netaji Subhas Chandra Bose International', city: 'Kolkata', country: 'India' },
  { code: 'HYD', name: 'Rajiv Gandhi International', city: 'Hyderabad', country: 'India' },
  { code: 'COK', name: 'Cochin International', city: 'Kochi', country: 'India' },
  { code: 'GOI', name: 'Dabolim', city: 'Goa', country: 'India' },
  { code: 'PNQ', name: 'Pune', city: 'Pune', country: 'India' },
  { code: 'AMD', name: 'Sardar Vallabhbhai Patel International', city: 'Ahmedabad', country: 'India' },
  
  // Asia - Pakistan & Bangladesh
  { code: 'KHI', name: 'Jinnah International', city: 'Karachi', country: 'Pakistan' },
  { code: 'LHE', name: 'Allama Iqbal International', city: 'Lahore', country: 'Pakistan' },
  { code: 'ISB', name: 'Islamabad International', city: 'Islamabad', country: 'Pakistan' },
  { code: 'DAC', name: 'Shahjalal International', city: 'Dhaka', country: 'Bangladesh' },
  
  // Australia & New Zealand
  { code: 'SYD', name: 'Sydney Kingsford Smith', city: 'Sydney', country: 'Australia' },
  { code: 'MEL', name: 'Melbourne', city: 'Melbourne', country: 'Australia' },
  { code: 'BNE', name: 'Brisbane', city: 'Brisbane', country: 'Australia' },
  { code: 'PER', name: 'Perth', city: 'Perth', country: 'Australia' },
  { code: 'ADL', name: 'Adelaide', city: 'Adelaide', country: 'Australia' },
  { code: 'OOL', name: 'Gold Coast', city: 'Gold Coast', country: 'Australia' },
  { code: 'CNS', name: 'Cairns', city: 'Cairns', country: 'Australia' },
  { code: 'DRW', name: 'Darwin', city: 'Darwin', country: 'Australia' },
  { code: 'HBA', name: 'Hobart', city: 'Hobart', country: 'Australia' },
  { code: 'AKL', name: 'Auckland', city: 'Auckland', country: 'New Zealand' },
  { code: 'WLG', name: 'Wellington', city: 'Wellington', country: 'New Zealand' },
  { code: 'CHC', name: 'Christchurch', city: 'Christchurch', country: 'New Zealand' },
  
  // South America
  { code: 'GRU', name: 'São Paulo/Guarulhos International', city: 'São Paulo', country: 'Brazil' },
  { code: 'GIG', name: 'Rio de Janeiro–Galeão International', city: 'Rio de Janeiro', country: 'Brazil' },
  { code: 'BSB', name: 'Brasília International', city: 'Brasília', country: 'Brazil' },
  { code: 'CGH', name: 'São Paulo/Congonhas', city: 'São Paulo', country: 'Brazil' },
  { code: 'EZE', name: 'Ministro Pistarini International', city: 'Buenos Aires', country: 'Argentina' },
  { code: 'AEP', name: 'Jorge Newbery Airfield', city: 'Buenos Aires', country: 'Argentina' },
  { code: 'SCL', name: 'Arturo Merino Benítez International', city: 'Santiago', country: 'Chile' },
  { code: 'LIM', name: 'Jorge Chávez International', city: 'Lima', country: 'Peru' },
  { code: 'BOG', name: 'El Dorado International', city: 'Bogotá', country: 'Colombia' },
  { code: 'UIO', name: 'Mariscal Sucre International', city: 'Quito', country: 'Ecuador' },
  { code: 'CCS', name: 'Simón Bolívar International', city: 'Caracas', country: 'Venezuela' },
  
  // Africa
  { code: 'JNB', name: 'O. R. Tambo International', city: 'Johannesburg', country: 'South Africa' },
  { code: 'CPT', name: 'Cape Town International', city: 'Cape Town', country: 'South Africa' },
  { code: 'CAI', name: 'Cairo International', city: 'Cairo', country: 'Egypt' },
  { code: 'CMN', name: 'Mohammed V International', city: 'Casablanca', country: 'Morocco' },
  { code: 'NBO', name: 'Jomo Kenyatta International', city: 'Nairobi', country: 'Kenya' },
  { code: 'ADD', name: 'Addis Ababa Bole International', city: 'Addis Ababa', country: 'Ethiopia' },
  { code: 'LOS', name: 'Murtala Muhammed International', city: 'Lagos', country: 'Nigeria' },
  { code: 'TUN', name: 'Tunis–Carthage International', city: 'Tunis', country: 'Tunisia' },
  { code: 'ALG', name: 'Houari Boumediene', city: 'Algiers', country: 'Algeria' },
  { code: 'DUR', name: 'King Shaka International', city: 'Durban', country: 'South Africa' },
];

/**
 * Search airports by code, name, or city
 */
export function searchAirports(query: string): Airport[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const normalizedQuery = query.trim().toLowerCase();
  
  return AIRPORTS.filter(airport => {
    const codeMatch = airport.code.toLowerCase().includes(normalizedQuery);
    const nameMatch = airport.name.toLowerCase().includes(normalizedQuery);
    const cityMatch = airport.city.toLowerCase().includes(normalizedQuery);
    
    return codeMatch || nameMatch || cityMatch;
  }).slice(0, 10); // Limit to 10 results
}

/**
 * Validate if a string is a valid airport code or matches an airport
 */
export function validateAirport(input: string): { valid: boolean; airport?: Airport; code?: string } {
  if (!input || input.trim().length === 0) {
    return { valid: false };
  }

  const normalizedInput = input.trim().toUpperCase();
  
  // Check if it's a direct airport code match
  const exactMatch = AIRPORTS.find(airport => airport.code === normalizedInput);
  if (exactMatch) {
    return { valid: true, airport: exactMatch, code: exactMatch.code };
  }

  // Check if it matches any airport (code, name, or city)
  const matches = searchAirports(input);
  if (matches.length > 0) {
    // Prefer exact code match, otherwise return first match
    const match = matches.find(a => a.code === normalizedInput) || matches[0];
    return { valid: true, airport: match, code: match.code };
  }

  return { valid: false };
}

/**
 * Get airport by code
 */
export function getAirportByCode(code: string): Airport | undefined {
  return AIRPORTS.find(airport => airport.code === code.toUpperCase());
}

