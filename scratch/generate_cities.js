import fs from 'fs';

const cities = [
  // Punjab
  { name: 'Ludhiana, Punjab, India', lat: 30.9010, lng: 75.8573 },
  { name: 'Amritsar, Punjab, India', lat: 31.6340, lng: 74.8723 },
  { name: 'Jalandhar, Punjab, India', lat: 31.3260, lng: 75.5762 },
  { name: 'Patiala, Punjab, India', lat: 30.3398, lng: 76.3869 },
  { name: 'Bathinda, Punjab, India', lat: 30.2076, lng: 74.9454 },
  { name: 'Mohali, Punjab, India', lat: 30.6970, lng: 76.7230 },
  { name: 'Pathankot, Punjab, India', lat: 32.2689, lng: 75.6531 },
  { name: 'Hoshiarpur, Punjab, India', lat: 31.5143, lng: 75.9115 },
  { name: 'Moga, Punjab, India', lat: 30.8175, lng: 75.1746 },
  { name: 'Phagwara, Punjab, India', lat: 31.2240, lng: 75.7725 },
  { name: 'Abohar, Punjab, India', lat: 30.1448, lng: 74.2001 },
  { name: 'Firozpur, Punjab, India', lat: 30.9248, lng: 74.6136 },
  { name: 'Khanna, Punjab, India', lat: 30.7042, lng: 76.2155 },
  { name: 'Muktsar, Punjab, India', lat: 30.4739, lng: 74.5135 },

  // Delhi
  { name: 'New Delhi, Delhi, India', lat: 28.6139, lng: 77.2090 },
  { name: 'Delhi Cantt, Delhi, India', lat: 28.5961, lng: 77.1299 },
  { name: 'Dwarka, Delhi, India', lat: 28.5823, lng: 77.0500 },
  { name: 'Rohini, Delhi, India', lat: 28.7159, lng: 77.1147 },

  // Haryana
  { name: 'Gurugram, Haryana, India', lat: 28.4595, lng: 77.0266 },
  { name: 'Faridabad, Haryana, India', lat: 28.4089, lng: 77.3178 },
  { name: 'Panipat, Haryana, India', lat: 29.3909, lng: 76.9635 },
  { name: 'Ambala, Haryana, India', lat: 30.3752, lng: 76.7821 },
  { name: 'Rohtak, Haryana, India', lat: 28.8955, lng: 76.6066 },
  { name: 'Karnal, Haryana, India', lat: 29.6857, lng: 76.9905 },
  { name: 'Sonipat, Haryana, India', lat: 28.9931, lng: 77.0151 },
  { name: 'Panchkula, Haryana, India', lat: 30.6942, lng: 76.8606 },
  { name: 'Yamunanagar, Haryana, India', lat: 30.1290, lng: 77.2674 },
  { name: 'Hisar, Haryana, India', lat: 29.1492, lng: 75.7217 },
  { name: 'Kurukshetra, Haryana, India', lat: 29.9695, lng: 76.8783 },
  { name: 'Chandigarh, India', lat: 30.7333, lng: 76.7794 },

  // Himachal Pradesh
  { name: 'Shimla, Himachal Pradesh, India', lat: 31.1048, lng: 77.1734 },
  { name: 'Dharamshala, Himachal Pradesh, India', lat: 32.2190, lng: 76.3234 },
  { name: 'Manali, Himachal Pradesh, India', lat: 32.2396, lng: 77.1887 },
  { name: 'Solan, Himachal Pradesh, India', lat: 30.9045, lng: 77.0967 },
  { name: 'Mandi, Himachal Pradesh, India', lat: 31.5892, lng: 76.9182 },
  { name: 'Hamirpur, Himachal Pradesh, India', lat: 31.6862, lng: 76.5234 },
  { name: 'Kullu, Himachal Pradesh, India', lat: 31.9578, lng: 77.1095 },
  { name: 'Dalhousie, Himachal Pradesh, India', lat: 32.5387, lng: 75.9710 },

  // Jammu & Kashmir
  { name: 'Srinagar, Jammu & Kashmir, India', lat: 34.0837, lng: 74.7973 },
  { name: 'Jammu, Jammu & Kashmir, India', lat: 32.7266, lng: 74.8570 },
  { name: 'Anantnag, Jammu & Kashmir, India', lat: 33.7314, lng: 75.1484 },
  { name: 'Udhampur, Jammu & Kashmir, India', lat: 32.9262, lng: 75.1325 },
  { name: 'Kathua, Jammu & Kashmir, India', lat: 32.3831, lng: 75.5204 },

  // Rajasthan
  { name: 'Jaipur, Rajasthan, India', lat: 26.9124, lng: 75.7873 },
  { name: 'Jodhpur, Rajasthan, India', lat: 26.2389, lng: 73.0243 },
  { name: 'Udaipur, Rajasthan, India', lat: 24.5854, lng: 73.7125 },
  { name: 'Kota, Rajasthan, India', lat: 25.1825, lng: 75.8396 },
  { name: 'Ajmer, Rajasthan, India', lat: 26.4499, lng: 74.6399 },
  { name: 'Bikaner, Rajasthan, India', lat: 28.0194, lng: 73.3119 },
  { name: 'Bhilwara, Rajasthan, India', lat: 25.3483, lng: 74.6406 },
  { name: 'Alwar, Rajasthan, India', lat: 27.5530, lng: 76.6089 },
  { name: 'Sikar, Rajasthan, India', lat: 27.6094, lng: 75.1398 },
  { name: 'Bharatpur, Rajasthan, India', lat: 27.2152, lng: 77.4930 },
  { name: 'Sri Ganganagar, Rajasthan, India', lat: 29.9174, lng: 73.8821 },
  { name: 'Pali, Rajasthan, India', lat: 25.7713, lng: 73.3234 },

  // Uttar Pradesh
  { name: 'Lucknow, Uttar Pradesh, India', lat: 26.8467, lng: 80.9462 },
  { name: 'Kanpur, Uttar Pradesh, India', lat: 26.4499, lng: 80.3319 },
  { name: 'Noida, Uttar Pradesh, India', lat: 28.5355, lng: 77.3910 },
  { name: 'Ghaziabad, Uttar Pradesh, India', lat: 28.6692, lng: 77.4538 },
  { name: 'Varanasi, Uttar Pradesh, India', lat: 25.3176, lng: 82.9739 },
  { name: 'Agra, Uttar Pradesh, India', lat: 27.1767, lng: 78.0081 },
  { name: 'Prayagraj, Uttar Pradesh, India', lat: 25.4358, lng: 81.8463 },
  { name: 'Meerut, Uttar Pradesh, India', lat: 28.9845, lng: 77.7064 },
  { name: 'Bareilly, Uttar Pradesh, India', lat: 28.3640, lng: 79.4150 },
  { name: 'Aligarh, Uttar Pradesh, India', lat: 27.8974, lng: 78.0880 },
  { name: 'Moradabad, Uttar Pradesh, India', lat: 28.8356, lng: 78.7733 },
  { name: 'Gorakhpur, Uttar Pradesh, India', lat: 26.7606, lng: 83.3731 },
  { name: 'Jhansi, Uttar Pradesh, India', lat: 25.4484, lng: 78.5685 },
  { name: 'Muzaffarnagar, Uttar Pradesh, India', lat: 29.4727, lng: 77.7085 },
  { name: 'Mathura, Uttar Pradesh, India', lat: 27.4924, lng: 77.6737 },
  { name: 'Ayodhya, Uttar Pradesh, India', lat: 26.7922, lng: 82.1998 },
  { name: 'Saharanpur, Uttar Pradesh, India', lat: 29.9672, lng: 77.5510 },
  { name: 'Firozabad, Uttar Pradesh, India', lat: 27.1511, lng: 78.3953 },
  { name: 'Lakhimpur, Uttar Pradesh, India', lat: 27.9475, lng: 80.7781 },

  // Uttarakhand
  { name: 'Dehradun, Uttarakhand, India', lat: 30.3165, lng: 78.0322 },
  { name: 'Haridwar, Uttarakhand, India', lat: 29.9457, lng: 78.1642 },
  { name: 'Rishikesh, Uttarakhand, India', lat: 30.0869, lng: 78.2676 },
  { name: 'Haldwani, Uttarakhand, India', lat: 29.2183, lng: 79.5126 },
  { name: 'Roorkee, Uttarakhand, India', lat: 29.8543, lng: 77.8880 },
  { name: 'Nainital, Uttarakhand, India', lat: 29.3919, lng: 79.4542 },

  // Bihar
  { name: 'Patna, Bihar, India', lat: 25.5941, lng: 85.1376 },
  { name: 'Gaya, Bihar, India', lat: 24.7914, lng: 84.9997 },
  { name: 'Bhagalpur, Bihar, India', lat: 25.2425, lng: 86.9842 },
  { name: 'Muzaffarpur, Bihar, India', lat: 26.1196, lng: 85.3910 },
  { name: 'Darbhanga, Bihar, India', lat: 26.1542, lng: 85.8918 },
  { name: 'Bihar Sharif, Bihar, India', lat: 25.1982, lng: 85.5149 },
  { name: 'Arrah, Bihar, India', lat: 25.5583, lng: 84.6677 },
  { name: 'Begusarai, Bihar, India', lat: 25.4182, lng: 86.1272 },
  { name: 'Purnia, Bihar, India', lat: 25.7771, lng: 87.4753 },
  { name: 'Katihar, Bihar, India', lat: 25.5382, lng: 87.5717 },

  // Jharkhand
  { name: 'Ranchi, Jharkhand, India', lat: 23.3441, lng: 85.3096 },
  { name: 'Jamshedpur, Jharkhand, India', lat: 22.8046, lng: 86.2029 },
  { name: 'Dhanbad, Jharkhand, India', lat: 23.7957, lng: 86.4304 },
  { name: 'Bokaro, Jharkhand, India', lat: 23.6693, lng: 86.1511 },
  { name: 'Deoghar, Jharkhand, India', lat: 24.4820, lng: 86.7001 },
  { name: 'Hazaribagh, Jharkhand, India', lat: 23.9961, lng: 85.3676 },

  // West Bengal
  { name: 'Kolkata, West Bengal, India', lat: 22.5726, lng: 88.3639 },
  { name: 'Howrah, West Bengal, India', lat: 22.5769, lng: 88.3186 },
  { name: 'Darjeeling, West Bengal, India', lat: 27.0410, lng: 88.2627 },
  { name: 'Siliguri, West Bengal, India', lat: 26.7271, lng: 88.3953 },
  { name: 'Asansol, West Bengal, India', lat: 23.6889, lng: 86.9749 },
  { name: 'Durgapur, West Bengal, India', lat: 23.5204, lng: 87.3119 },
  { name: 'Kharagpur, West Bengal, India', lat: 22.3302, lng: 87.3237 },
  { name: 'Bardhaman, West Bengal, India', lat: 23.2324, lng: 87.8630 },
  { name: 'Haldia, West Bengal, India', lat: 22.0645, lng: 88.0699 },

  // Odisha
  { name: 'Bhubaneswar, Odisha, India', lat: 20.2961, lng: 85.8245 },
  { name: 'Cuttack, Odisha, India', lat: 20.4625, lng: 85.8830 },
  { name: 'Rourkela, Odisha, India', lat: 22.2604, lng: 84.8536 },
  { name: 'Berhampur, Odisha, India', lat: 19.3150, lng: 84.7941 },
  { name: 'Sambalpur, Odisha, India', lat: 21.4669, lng: 83.9812 },
  { name: 'Puri, Odisha, India', lat: 19.8134, lng: 85.8315 },

  // Madhya Pradesh
  { name: 'Bhopal, Madhya Pradesh, India', lat: 23.2599, lng: 77.4126 },
  { name: 'Indore, Madhya Pradesh, India', lat: 22.7196, lng: 75.8577 },
  { name: 'Jabalpur, Madhya Pradesh, India', lat: 23.1815, lng: 79.9864 },
  { name: 'Gwalior, Madhya Pradesh, India', lat: 26.2124, lng: 78.1772 },
  { name: 'Ujjain, Madhya Pradesh, India', lat: 23.1760, lng: 75.7885 },
  { name: 'Sagar, Madhya Pradesh, India', lat: 23.8388, lng: 78.7378 },
  { name: 'Dewas, Madhya Pradesh, India', lat: 22.9624, lng: 76.0507 },
  { name: 'Satna, Madhya Pradesh, India', lat: 24.6005, lng: 80.8322 },
  { name: 'Ratlam, Madhya Pradesh, India', lat: 23.3315, lng: 75.0367 },

  // Chhattisgarh
  { name: 'Raipur, Chhattisgarh, India', lat: 21.2514, lng: 81.6296 },
  { name: 'Bilaspur, Chhattisgarh, India', lat: 22.0790, lng: 82.1391 },
  { name: 'Durg, Chhattisgarh, India', lat: 21.1904, lng: 81.2849 },
  { name: 'Bhilai, Chhattisgarh, India', lat: 21.1938, lng: 81.3509 },

  // Gujarat
  { name: 'Ahmedabad, Gujarat, India', lat: 23.0225, lng: 72.5714 },
  { name: 'Surat, Gujarat, India', lat: 21.1702, lng: 72.8311 },
  { name: 'Vadodara, Gujarat, India', lat: 22.3072, lng: 73.1812 },
  { name: 'Rajkot, Gujarat, India', lat: 22.3039, lng: 70.8022 },
  { name: 'Bhavnagar, Gujarat, India', lat: 21.7645, lng: 72.1519 },
  { name: 'Jamnagar, Gujarat, India', lat: 22.4707, lng: 70.0577 },
  { name: 'Junagadh, Gujarat, India', lat: 21.5222, lng: 70.4579 },
  { name: 'Gandhinagar, Gujarat, India', lat: 23.2156, lng: 72.6369 },
  { name: 'Anand, Gujarat, India', lat: 22.5645, lng: 72.9289 },

  // Maharashtra
  { name: 'Mumbai, Maharashtra, India', lat: 19.0760, lng: 72.8777 },
  { name: 'Pune, Maharashtra, India', lat: 18.5204, lng: 73.8567 },
  { name: 'Nagpur, Maharashtra, India', lat: 21.1458, lng: 79.0882 },
  { name: 'Nashik, Maharashtra, India', lat: 19.9975, lng: 73.7898 },
  { name: 'Thane, Maharashtra, India', lat: 19.2183, lng: 72.9781 },
  { name: 'Aurangabad, Maharashtra, India', lat: 19.8762, lng: 75.3433 },
  { name: 'Solapur, Maharashtra, India', lat: 17.6599, lng: 75.9064 },
  { name: 'Amravati, Maharashtra, India', lat: 20.9374, lng: 77.7796 },
  { name: 'Kolhapur, Maharashtra, India', lat: 16.7050, lng: 74.2433 },
  { name: 'Navi Mumbai, Maharashtra, India', lat: 19.0330, lng: 73.0297 },
  { name: 'Kalyan, Maharashtra, India', lat: 19.2403, lng: 73.1305 },

  // Goa
  { name: 'Panaji, Goa, India', lat: 15.4909, lng: 73.8278 },
  { name: 'Margao, Goa, India', lat: 15.2736, lng: 73.9582 },
  { name: 'Vasco da Gama, Goa, India', lat: 15.3992, lng: 73.8115 },

  // Karnataka
  { name: 'Bengaluru, Karnataka, India', lat: 12.9716, lng: 77.5946 },
  { name: 'Mysuru, Karnataka, India', lat: 12.2958, lng: 76.6394 },
  { name: 'Mangaluru, Karnataka, India', lat: 12.9141, lng: 74.8560 },
  { name: 'Hubli-Dharwad, Karnataka, India', lat: 15.3647, lng: 75.1240 },
  { name: 'Belagavi, Karnataka, India', lat: 15.8497, lng: 74.4977 },
  { name: 'Davanagere, Karnataka, India', lat: 14.4644, lng: 75.9218 },
  { name: 'Kalaburagi, Karnataka, India', lat: 17.3297, lng: 76.8343 },
  { name: 'Ballari, Karnataka, India', lat: 15.1394, lng: 76.9214 },

  // Telangana
  { name: 'Hyderabad, Telangana, India', lat: 17.3850, lng: 78.4867 },
  { name: 'Warangal, Telangana, India', lat: 18.0000, lng: 79.5800 },
  { name: 'Nizamabad, Telangana, India', lat: 18.6725, lng: 78.0941 },
  { name: 'Karimnagar, Telangana, India', lat: 18.4386, lng: 79.1288 },
  { name: 'Khammam, Telangana, India', lat: 17.2473, lng: 80.1514 },

  // Andhra Pradesh
  { name: 'Visakhapatnam, Andhra Pradesh, India', lat: 17.6868, lng: 83.2185 },
  { name: 'Vijayawada, Andhra Pradesh, India', lat: 16.5062, lng: 80.6480 },
  { name: 'Guntur, Andhra Pradesh, India', lat: 16.3067, lng: 80.4365 },
  { name: 'Nellore, Andhra Pradesh, India', lat: 14.4426, lng: 79.9865 },
  { name: 'Kurnool, Andhra Pradesh, India', lat: 15.8281, lng: 78.0373 },
  { name: 'Rajamahendravaram, Andhra Pradesh, India', lat: 17.0005, lng: 81.8040 },
  { name: 'Tirupati, Andhra Pradesh, India', lat: 13.6288, lng: 79.4192 },
  { name: 'Kakinada, Andhra Pradesh, India', lat: 16.9891, lng: 82.2475 },

  // Tamil Nadu
  { name: 'Chennai, Tamil Nadu, India', lat: 13.0827, lng: 80.2707 },
  { name: 'Coimbatore, Tamil Nadu, India', lat: 11.0168, lng: 76.9558 },
  { name: 'Madurai, Tamil Nadu, India', lat: 9.9252, lng: 78.1198 },
  { name: 'Tiruchirappalli, Tamil Nadu, India', lat: 10.7905, lng: 78.7047 },
  { name: 'Salem, Tamil Nadu, India', lat: 11.6643, lng: 78.1460 },
  { name: 'Tiruppur, Tamil Nadu, India', lat: 11.1085, lng: 77.3411 },
  { name: 'Vellore, Tamil Nadu, India', lat: 12.9165, lng: 79.1325 },
  { name: 'Erode, Tamil Nadu, India', lat: 11.3410, lng: 77.7172 },

  // Kerala
  { name: 'Kochi, Kerala, India', lat: 9.9312, lng: 76.2673 },
  { name: 'Thiruvananthapuram, Kerala, India', lat: 8.5241, lng: 76.9366 },
  { name: 'Kozhikode, Kerala, India', lat: 11.2588, lng: 75.7804 },
  { name: 'Thrissur, Kerala, India', lat: 10.5276, lng: 76.2144 },
  { name: 'Kollam, Kerala, India', lat: 8.8932, lng: 76.6141 },
  { name: 'Alappuzha, Kerala, India', lat: 9.4981, lng: 76.3388 },

  // Assam & Northeast
  { name: 'Guwahati, Assam, India', lat: 26.1445, lng: 91.7362 },
  { name: 'Dibrugarh, Assam, India', lat: 27.4728, lng: 94.9120 },
  { name: 'Silchar, Assam, India', lat: 24.8333, lng: 92.7789 },
  { name: 'Shillong, Meghalaya, India', lat: 25.5788, lng: 91.8831 },
  { name: 'Imphal, Manipur, India', lat: 24.8170, lng: 93.9368 },
  { name: 'Aizawl, Mizoram, India', lat: 23.7307, lng: 92.7173 },
  { name: 'Kohima, Nagaland, India', lat: 25.6751, lng: 94.1086 },
  { name: 'Gangtok, Sikkim, India', lat: 27.3314, lng: 88.6138 },
  { name: 'Itanagar, Arunachal Pradesh, India', lat: 27.0844, lng: 93.6053 },

  // Global capitals/cities
  { name: 'New York, NY, USA', lat: 40.7128, lng: -74.0060 },
  { name: 'Los Angeles, CA, USA', lat: 34.0522, lng: -118.2437 },
  { name: 'Chicago, IL, USA', lat: 41.8781, lng: -87.6298 },
  { name: 'Houston, TX, USA', lat: 29.7604, lng: -95.3698 },
  { name: 'San Francisco, CA, USA', lat: 37.7749, lng: -122.4194 },
  { name: 'Washington, DC, USA', lat: 38.9072, lng: -77.0369 },
  { name: 'Boston, MA, USA', lat: 42.3601, lng: -71.0589 },
  { name: 'Miami, FL, USA', lat: 25.7617, lng: -80.1918 },
  
  { name: 'London, UK', lat: 51.5074, lng: -0.1278 },
  { name: 'Manchester, UK', lat: 53.4808, lng: -2.2426 },
  { name: 'Birmingham, UK', lat: 52.4862, lng: -1.8904 },
  
  { name: 'Toronto, ON, Canada', lat: 43.6532, lng: -79.3832 },
  { name: 'Vancouver, BC, Canada', lat: 49.2827, lng: -123.1207 },
  { name: 'Montreal, QC, Canada', lat: 45.5017, lng: -73.5673 },
  
  { name: 'Sydney, NSW, Australia', lat: -33.8688, lng: 151.2093 },
  { name: 'Melbourne, VIC, Australia', lat: -37.8136, lng: 144.9631 },
  { name: 'Brisbane, QLD, Australia', lat: -27.4698, lng: 153.0251 },
  
  { name: 'Paris, France', lat: 48.8566, lng: 2.3522 },
  { name: 'Marseille, France', lat: 43.2965, lng: 5.3698 },
  { name: 'Berlin, Germany', lat: 52.5200, lng: 13.4050 },
  { name: 'Munich, Germany', lat: 48.1351, lng: 11.5820 },
  { name: 'Frankfurt, Germany', lat: 50.1109, lng: 8.6821 },
  
  { name: 'Rome, Italy', lat: 41.9028, lng: 12.4964 },
  { name: 'Milan, Italy', lat: 45.4642, lng: 9.1900 },
  { name: 'Madrid, Spain', lat: 40.4168, lng: -3.7038 },
  { name: 'Barcelona, Spain', lat: 41.3851, lng: 2.1734 },
  
  { name: 'Dubai, UAE', lat: 25.2048, lng: 55.2708 },
  { name: 'Abu Dhabi, UAE', lat: 24.4539, lng: 54.3773 },
  { name: 'Sharjah, UAE', lat: 25.3463, lng: 55.4209 },
  
  { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { name: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503 },
  { name: 'Osaka, Japan', lat: 34.6937, lng: 135.5022 },
  
  { name: 'Bangkok, Thailand', lat: 13.7563, lng: 100.5018 },
  { name: 'Kuala Lumpur, Malaysia', lat: 3.1390, lng: 101.6869 },
  { name: 'Jakarta, Indonesia', lat: -6.2088, lng: 106.8456 },
  { name: 'Manila, Philippines', lat: 14.5995, lng: 120.9842 },
  { name: 'Seoul, South Korea', lat: 37.5665, lng: 126.9780 },
  
  { name: 'Cairo, Egypt', lat: 30.0444, lng: 31.2357 },
  { name: 'Cape Town, South Africa', lat: -33.9249, lng: 18.4241 },
  { name: 'Johannesburg, South Africa', lat: -26.2041, lng: 28.0473 },
  { name: 'Nairobi, Kenya', lat: -1.2921, lng: 36.8219 },
  
  { name: 'Moscow, Russia', lat: 55.7558, lng: 37.6173 },
  { name: 'Beijing, China', lat: 39.9042, lng: 116.4074 },
  { name: 'Shanghai, China', lat: 31.2304, lng: 121.4737 },
  { name: 'Hong Kong', lat: 22.3193, lng: 114.1694 },
  
  { name: 'Riyadh, Saudi Arabia', lat: 24.7136, lng: 46.6753 },
  { name: 'Jeddah, Saudi Arabia', lat: 21.5433, lng: 39.1728 },
  { name: 'Doha, Qatar', lat: 25.2854, lng: 51.5310 },
  { name: 'Muscat, Oman', lat: 23.5859, lng: 58.4059 },
  { name: 'Kuwait City, Kuwait', lat: 29.3759, lng: 47.9774 },
  { name: 'Manama, Bahrain', lat: 26.2285, lng: 50.5860 },
  
  { name: 'Colombo, Sri Lanka', lat: 6.9271, lng: 79.8612 },
  { name: 'Kathmandu, Nepal', lat: 27.7172, lng: 85.3240 },
  { name: 'Dhaka, Bangladesh', lat: 23.8103, lng: 90.4125 },
  { name: 'Thimphu, Bhutan', lat: 27.4728, lng: 89.6370 },
  { name: 'Kabul, Afghanistan', lat: 34.5553, lng: 69.2075 },
  { name: 'Islamabad, Pakistan', lat: 33.6844, lng: 73.0479 },
  { name: 'Karachi, Pakistan', lat: 24.8607, lng: 67.0011 },
  { name: 'Lahore, Pakistan', lat: 31.5204, lng: 74.3587 }
];

const content = `// Comprehensive list of cities with coordinates for Vedic Astrology calculation
export interface City {
  name: string;
  lat: number;
  lng: number;
}

export const CITIES: City[] = ${JSON.stringify(cities, null, 2)};
`;

fs.writeFileSync('src/engine/cities.ts', content);
console.log('src/engine/cities.ts successfully generated with ' + cities.length + ' cities.');
