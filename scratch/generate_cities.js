import fs from 'fs';

const cities = [
  {
    "name": "Abhaneri, Rajasthan, India",
    "lat": 27.00743,
    "lng": 76.6076
  },
  {
    "name": "Abhayapuri, Assam, India",
    "lat": 26.32255,
    "lng": 90.68526
  },
  {
    "name": "Abiramam, Tamil Nadu, India",
    "lat": 9.4423,
    "lng": 78.4399
  },
  {
    "name": "Abohar, Punjab, India",
    "lat": 30.14453,
    "lng": 74.19552
  },
  {
    "name": "Abrama, Gujarat, India",
    "lat": 20.85865,
    "lng": 72.90648
  },
  {
    "name": "Abu Dhabi, UAE",
    "lat": 24.4539,
    "lng": 54.3773
  },
  {
    "name": "Abu Road, Rajasthan, India",
    "lat": 24.48012,
    "lng": 72.78186
  },
  {
    "name": "Abu, Rajasthan, India",
    "lat": 24.59365,
    "lng": 72.71756
  },
  {
    "name": "Achalpur, Maharashtra, India",
    "lat": 21.25665,
    "lng": 77.51006
  },
  {
    "name": "Achhnera, Uttar Pradesh, India",
    "lat": 27.17826,
    "lng": 77.75674
  },
  {
    "name": "Adalaj, Gujarat, India",
    "lat": 23.16453,
    "lng": 72.58107
  },
  {
    "name": "Adampur, Punjab, India",
    "lat": 31.43224,
    "lng": 75.71484
  },
  {
    "name": "Adawad, Maharashtra, India",
    "lat": 21.21666667,
    "lng": 75.45
  },
  {
    "name": "Addanki, Andhra Pradesh, India",
    "lat": 15.81061,
    "lng": 79.97338
  },
  {
    "name": "Adilabad, Telangana, India",
    "lat": 19.5,
    "lng": 78.5
  },
  {
    "name": "Adirampattinam, Tamil Nadu, India",
    "lat": 10.34059,
    "lng": 79.37905
  },
  {
    "name": "Adoni, Andhra Pradesh, India",
    "lat": 15.62788,
    "lng": 77.27495
  },
  {
    "name": "Adoor, Kerala, India",
    "lat": 9.15595,
    "lng": 76.73192
  },
  {
    "name": "Adra, West Bengal, India",
    "lat": 23.496015,
    "lng": 86.67249
  },
  {
    "name": "Aduthurai, Tamil Nadu, India",
    "lat": 11.01542,
    "lng": 79.48093
  },
  {
    "name": "Afzalgarh, Uttar Pradesh, India",
    "lat": 29.3937,
    "lng": 78.67393
  },
  {
    "name": "Afzalpur, Karnataka, India",
    "lat": 17.19986,
    "lng": 76.36018
  },
  {
    "name": "Agar Panchaitan, Maharashtra, India",
    "lat": 18.173692,
    "lng": 72.988533
  },
  {
    "name": "Agar, Madhya Pradesh, India",
    "lat": 23.71177,
    "lng": 76.01571
  },
  {
    "name": "Agartala, Tripura, India",
    "lat": 23.83605,
    "lng": 91.27939
  },
  {
    "name": "Agol, Gujarat, India",
    "lat": 23.15,
    "lng": 72.26666667
  },
  {
    "name": "Agra, Uttar Pradesh, India",
    "lat": 27.18333,
    "lng": 78.01667
  },
  {
    "name": "Aheri, Maharashtra, India",
    "lat": 19.41166667,
    "lng": 80.00388889
  },
  {
    "name": "Ahmadpur, Maharashtra, India",
    "lat": 18.70622,
    "lng": 76.93731
  },
  {
    "name": "Ahmedabad, Gujarat, India",
    "lat": 23.02579,
    "lng": 72.58727
  },
  {
    "name": "Ahmednagar, Maharashtra, India",
    "lat": 19.08333333,
    "lng": 74.73333333
  },
  {
    "name": "Ahmedpur, West Bengal, India",
    "lat": 23.83009,
    "lng": 87.68661
  },
  {
    "name": "Ahraura, Uttar Pradesh, India",
    "lat": 25.01579,
    "lng": 83.03294
  },
  {
    "name": "Ahwa, Gujarat, India",
    "lat": 20.75718,
    "lng": 73.68626
  },
  {
    "name": "Aidalpur, Uttar Pradesh, India",
    "lat": 26.13333333,
    "lng": 79.45
  },
  {
    "name": "Airoli, Maharashtra, India",
    "lat": 19.15096,
    "lng": 72.99625
  },
  {
    "name": "Airwa, Uttar Pradesh, India",
    "lat": 26.9,
    "lng": 79.43333333
  },
  {
    "name": "Aizawl, Mizoram, India",
    "lat": 23.8,
    "lng": 92.9
  },
  {
    "name": "Ajaigarh, Madhya Pradesh, India",
    "lat": 24.89879,
    "lng": 80.25921
  },
  {
    "name": "Ajara, Maharashtra, India",
    "lat": 16.11601,
    "lng": 74.21097
  },
  {
    "name": "Ajitgarh, Punjab, India",
    "lat": 30.65,
    "lng": 76.7
  },
  {
    "name": "Ajjampur, Karnataka, India",
    "lat": 13.72794,
    "lng": 76.0068
  },
  {
    "name": "Ajmer, Rajasthan, India",
    "lat": 26.25,
    "lng": 74.66667
  },
  {
    "name": "Ajnala, Punjab, India",
    "lat": 31.84473,
    "lng": 74.76295
  },
  {
    "name": "Akalgarh, Punjab, India",
    "lat": 29.82074,
    "lng": 75.89078
  },
  {
    "name": "Akalkot, Maharashtra, India",
    "lat": 17.52532,
    "lng": 76.20611
  },
  {
    "name": "Akaltara, Chhattisgarh, India",
    "lat": 22.02463,
    "lng": 82.42641
  },
  {
    "name": "Akasahebpet, Andhra Pradesh, India",
    "lat": 17.50455,
    "lng": 82.56597
  },
  {
    "name": "Akbarpur, Uttar Pradesh, India",
    "lat": 26.42953,
    "lng": 82.53431
  },
  {
    "name": "Akhnur, Jammu and Kashmir, India",
    "lat": 32.86667,
    "lng": 74.73333
  },
  {
    "name": "Akividu, Andhra Pradesh, India",
    "lat": 16.58225,
    "lng": 81.38112
  },
  {
    "name": "Akkarampalle, Andhra Pradesh, India",
    "lat": 13.65,
    "lng": 79.42
  },
  {
    "name": "Aklera, Rajasthan, India",
    "lat": 24.41288,
    "lng": 76.56719
  },
  {
    "name": "Akluj, Maharashtra, India",
    "lat": 17.88333333,
    "lng": 75.01666667
  },
  {
    "name": "Aknapur, West Bengal, India",
    "lat": 18.38576389,
    "lng": 77.27225278
  },
  {
    "name": "Akodia, Madhya Pradesh, India",
    "lat": 23.38027,
    "lng": 76.59875
  },
  {
    "name": "Akola, Maharashtra, India",
    "lat": 20.5,
    "lng": 77.16667
  },
  {
    "name": "Akola, Uttar Pradesh, India",
    "lat": 27.06547,
    "lng": 77.88084
  },
  {
    "name": "Akolner, Maharashtra, India",
    "lat": 18.98333333,
    "lng": 74.66666667
  },
  {
    "name": "Akot, Maharashtra, India",
    "lat": 21.0963,
    "lng": 77.0588
  },
  {
    "name": "Akrani, Maharashtra, India",
    "lat": 21.82423611,
    "lng": 74.21687222
  },
  {
    "name": "Akrund, Gujarat, India",
    "lat": 23.28333333,
    "lng": 73.11666667
  },
  {
    "name": "Alagapuram, Tamil Nadu, India",
    "lat": 11.88705,
    "lng": 78.91758
  },
  {
    "name": "Alampur, Madhya Pradesh, India",
    "lat": 26.02514,
    "lng": 78.79697
  },
  {
    "name": "Alampur, Telangana, India",
    "lat": 15.87987,
    "lng": 78.13352
  },
  {
    "name": "Aland, Karnataka, India",
    "lat": 17.56425,
    "lng": 76.56854
  },
  {
    "name": "Alandi, Maharashtra, India",
    "lat": 18.67756,
    "lng": 73.89868
  },
  {
    "name": "Alandur, Tamil Nadu, India",
    "lat": 13.0025,
    "lng": 80.20611
  },
  {
    "name": "Alanganallur, Tamil Nadu, India",
    "lat": 10.04697,
    "lng": 78.09033
  },
  {
    "name": "Alangayam, Tamil Nadu, India",
    "lat": 12.62235,
    "lng": 78.75207
  },
  {
    "name": "Alangudi, Tamil Nadu, India",
    "lat": 10.3606,
    "lng": 78.98492
  },
  {
    "name": "Alangulam, Tamil Nadu, India",
    "lat": 8.86404,
    "lng": 77.49937
  },
  {
    "name": "Alappakkam, Tamil Nadu, India",
    "lat": 11.59895,
    "lng": 79.71893
  },
  {
    "name": "Alappuzha, Kerala, India",
    "lat": 9.49004,
    "lng": 76.3264
  },
  {
    "name": "Alawalpur, Punjab, India",
    "lat": 31.43161,
    "lng": 75.65614
  },
  {
    "name": "Aldona, Goa, India",
    "lat": 15.59337,
    "lng": 73.87482
  },
  {
    "name": "Ale, Maharashtra, India",
    "lat": 19.17,
    "lng": 74.12
  },
  {
    "name": "Alibag, Maharashtra, India",
    "lat": 18.64813,
    "lng": 72.87579
  },
  {
    "name": "Aliganj, Uttar Pradesh, India",
    "lat": 27.49358,
    "lng": 79.17127
  },
  {
    "name": "Aligarh, Uttar Pradesh, India",
    "lat": 27.83333,
    "lng": 78.16667
  },
  {
    "name": "Alipur, Delhi, India",
    "lat": 28.79862,
    "lng": 77.13314
  },
  {
    "name": "Alipurduar, West Bengal, India",
    "lat": 26.49136,
    "lng": 89.52796
  },
  {
    "name": "Alirajpur, Madhya Pradesh, India",
    "lat": 22.31384,
    "lng": 74.36452
  },
  {
    "name": "Alkuti, Maharashtra, India",
    "lat": 19.05,
    "lng": 74.23
  },
  {
    "name": "Allahabad, Uttar Pradesh, India",
    "lat": 25.45,
    "lng": 81.85
  },
  {
    "name": "Allahganj, Uttar Pradesh, India",
    "lat": 27.5454,
    "lng": 79.68715
  },
  {
    "name": "Allapalli, Maharashtra, India",
    "lat": 19.43172,
    "lng": 80.06377
  },
  {
    "name": "Almora, Uttarakhand, India",
    "lat": 29.69223,
    "lng": 79.49789
  },
  {
    "name": "Alnavar, Karnataka, India",
    "lat": 15.42727,
    "lng": 74.74111
  },
  {
    "name": "Along, Arunachal Pradesh, India",
    "lat": 28.16951,
    "lng": 94.8006
  },
  {
    "name": "Alot, Madhya Pradesh, India",
    "lat": 23.76336,
    "lng": 75.55662
  },
  {
    "name": "Alur, Karnataka, India",
    "lat": 12.97805,
    "lng": 75.99094
  },
  {
    "name": "Aluva, Kerala, India",
    "lat": 10.10764,
    "lng": 76.35158
  },
  {
    "name": "Alwa Tirunagari, Tamil Nadu, India",
    "lat": 8.60635,
    "lng": 77.93983
  },
  {
    "name": "Alwar, Rajasthan, India",
    "lat": 27.5,
    "lng": 76.5
  },
  {
    "name": "Alwaye, Kerala, India",
    "lat": 10.10649,
    "lng": 76.35484
  },
  {
    "name": "Amalapuram, Andhra Pradesh, India",
    "lat": 16.57868,
    "lng": 82.00609
  },
  {
    "name": "Amalner, Maharashtra, India",
    "lat": 21.03983,
    "lng": 75.05887
  },
  {
    "name": "Amanganj, Madhya Pradesh, India",
    "lat": 24.42664,
    "lng": 80.03579
  },
  {
    "name": "Amanpur, Uttar Pradesh, India",
    "lat": 27.71222,
    "lng": 78.73788
  },
  {
    "name": "Amarkantak, Madhya Pradesh, India",
    "lat": 22.67486,
    "lng": 81.75908
  },
  {
    "name": "Amarnath, Maharashtra, India",
    "lat": 19.2,
    "lng": 73.16667
  },
  {
    "name": "Amarpatan, Madhya Pradesh, India",
    "lat": 24.31371,
    "lng": 80.97703
  },
  {
    "name": "Amarpur, Bihar, India",
    "lat": 25.03967,
    "lng": 86.90247
  },
  {
    "name": "Amarpur, Tripura, India",
    "lat": 23.5257,
    "lng": 91.65879
  },
  {
    "name": "Amarwara, Madhya Pradesh, India",
    "lat": 22.2978,
    "lng": 79.16943
  },
  {
    "name": "Amauli, Uttar Pradesh, India",
    "lat": 26.01666667,
    "lng": 80.3
  },
  {
    "name": "Ambad, Maharashtra, India",
    "lat": 19.61301,
    "lng": 75.78906
  },
  {
    "name": "Ambagarh Chauki, Chhattisgarh, India",
    "lat": 20.77644,
    "lng": 80.74608
  },
  {
    "name": "Ambah, Madhya Pradesh, India",
    "lat": 26.70423,
    "lng": 78.22678
  },
  {
    "name": "Ambahta, Uttar Pradesh, India",
    "lat": 29.85706,
    "lng": 77.33583
  },
  {
    "name": "Ambajogai, Maharashtra, India",
    "lat": 18.73312,
    "lng": 76.38616
  },
  {
    "name": "Ambala, Haryana, India",
    "lat": 30.32854,
    "lng": 76.9422
  },
  {
    "name": "Ambasa, Tripura, India",
    "lat": 23.936,
    "lng": 91.85436
  },
  {
    "name": "Ambasamudram, Tamil Nadu, India",
    "lat": 8.71068,
    "lng": 77.4519
  },
  {
    "name": "Ambattur, Tamil Nadu, India",
    "lat": 13.09818,
    "lng": 80.16152
  },
  {
    "name": "Ambedkar Nagar, Uttar Pradesh, India",
    "lat": 26.40544,
    "lng": 82.69762
  },
  {
    "name": "Ambegaon, Maharashtra, India",
    "lat": 19.11666667,
    "lng": 73.73333333
  },
  {
    "name": "Ambernath, Maharashtra, India",
    "lat": 19.209,
    "lng": 73.186
  },
  {
    "name": "Ambikapur, Chhattisgarh, India",
    "lat": 23.11892,
    "lng": 83.19537
  },
  {
    "name": "Ambur, Tamil Nadu, India",
    "lat": 12.79163,
    "lng": 78.71644
  },
  {
    "name": "Amet, Rajasthan, India",
    "lat": 25.30609,
    "lng": 73.9258
  },
  {
    "name": "Amethi, Uttar Pradesh, India",
    "lat": 28.01667,
    "lng": 81.05
  },
  {
    "name": "Amgaon, Maharashtra, India",
    "lat": 20.65,
    "lng": 79.95
  },
  {
    "name": "Amguri, Assam, India",
    "lat": 26.81482,
    "lng": 94.52614
  },
  {
    "name": "Amla, Madhya Pradesh, India",
    "lat": 21.92485,
    "lng": 78.12786
  },
  {
    "name": "Amlagora, West Bengal, India",
    "lat": 22.84616,
    "lng": 87.33559
  },
  {
    "name": "Amli, Dadra and Nagar Haveli and Daman and Diu, India",
    "lat": 20.28333,
    "lng": 73.01667
  },
  {
    "name": "Amloh, Punjab, India",
    "lat": 30.60837,
    "lng": 76.23199
  },
  {
    "name": "Ammapettai, Tamil Nadu, India",
    "lat": 10.79476,
    "lng": 79.31986
  },
  {
    "name": "Amod, Gujarat, India",
    "lat": 21.99317,
    "lng": 72.87047
  },
  {
    "name": "Amravati, Maharashtra, India",
    "lat": 20.93333,
    "lng": 77.75
  },
  {
    "name": "Amreli, Gujarat, India",
    "lat": 21.50789,
    "lng": 71.18323
  },
  {
    "name": "Amritsar, Punjab, India",
    "lat": 31.67,
    "lng": 74.84
  },
  {
    "name": "Amroha, Uttar Pradesh, India",
    "lat": 28.90314,
    "lng": 78.46984
  },
  {
    "name": "Amroli, Gujarat, India",
    "lat": 21.25084,
    "lng": 72.83878
  },
  {
    "name": "Amta, West Bengal, India",
    "lat": 22.57333333,
    "lng": 88.01611111
  },
  {
    "name": "Amtala, West Bengal, India",
    "lat": 22.22,
    "lng": 88.17
  },
  {
    "name": "Amudalavalasa, Andhra Pradesh, India",
    "lat": 18.41025,
    "lng": 83.90295
  },
  {
    "name": "Anakapalle, Andhra Pradesh, India",
    "lat": 17.69134,
    "lng": 83.00395
  },
  {
    "name": "Anamalais, Tamil Nadu, India",
    "lat": 10.58303,
    "lng": 76.93441
  },
  {
    "name": "Anand, Gujarat, India",
    "lat": 22.4,
    "lng": 72.75
  },
  {
    "name": "Anandnagar, Uttar Pradesh, India",
    "lat": 27.10062,
    "lng": 83.27156
  },
  {
    "name": "Anandpur Sahib, Punjab, India",
    "lat": 31.23926,
    "lng": 76.50253
  },
  {
    "name": "Anantapur, Andhra Pradesh, India",
    "lat": 14.55,
    "lng": 77.41667
  },
  {
    "name": "Anantnag, Jammu and Kashmir, India",
    "lat": 33.73068,
    "lng": 75.15418
  },
  {
    "name": "Andal, West Bengal, India",
    "lat": 23.5743019,
    "lng": 87.1853236
  },
  {
    "name": "Andheri, Maharashtra, India",
    "lat": 19.11916667,
    "lng": 72.84694444
  },
  {
    "name": "Andippatti, Tamil Nadu, India",
    "lat": 9.99797,
    "lng": 77.62097
  },
  {
    "name": "Andol, Telangana, India",
    "lat": 17.81458,
    "lng": 78.07713
  },
  {
    "name": "Andura, Maharashtra, India",
    "lat": 20.88333333,
    "lng": 76.86666667
  },
  {
    "name": "Anekal, Karnataka, India",
    "lat": 12.7111,
    "lng": 77.69557
  },
  {
    "name": "Angamali, Kerala, India",
    "lat": 10.19055,
    "lng": 76.38789
  },
  {
    "name": "Angul District, Odisha, India",
    "lat": 20.84903,
    "lng": 85.06079
  },
  {
    "name": "Angul, Odisha, India",
    "lat": 20.84089,
    "lng": 85.10192
  },
  {
    "name": "Anjad, Madhya Pradesh, India",
    "lat": 22.04171,
    "lng": 75.05519
  },
  {
    "name": "Anjangaon, Maharashtra, India",
    "lat": 21.16516,
    "lng": 77.3091
  },
  {
    "name": "Anjar, Gujarat, India",
    "lat": 23.11316,
    "lng": 70.02671
  },
  {
    "name": "Anjarle, Maharashtra, India",
    "lat": 17.85,
    "lng": 73.09
  },
  {
    "name": "Anjaw, Arunachal Pradesh, India",
    "lat": 28.06549,
    "lng": 96.82878
  },
  {
    "name": "Ankleshwar, Gujarat, India",
    "lat": 21.63236,
    "lng": 72.99001
  },
  {
    "name": "Ankola, Karnataka, India",
    "lat": 14.66049,
    "lng": 74.3047
  },
  {
    "name": "Annamalainagar, Tamil Nadu, India",
    "lat": 11.4,
    "lng": 79.73333
  },
  {
    "name": "Annavasal, Tamil Nadu, India",
    "lat": 10.4606,
    "lng": 78.70029
  },
  {
    "name": "Annigeri, Karnataka, India",
    "lat": 15.42513,
    "lng": 75.4335
  },
  {
    "name": "Annur, Tamil Nadu, India",
    "lat": 11.23616,
    "lng": 77.10514
  },
  {
    "name": "Anshing, Maharashtra, India",
    "lat": 20.0409,
    "lng": 77.31501
  },
  {
    "name": "Anta, Rajasthan, India",
    "lat": 25.15,
    "lng": 76.3
  },
  {
    "name": "Anthiyur, Tamil Nadu, India",
    "lat": 11.57506,
    "lng": 77.59043
  },
  {
    "name": "Antri, Madhya Pradesh, India",
    "lat": 26.05804,
    "lng": 78.21027
  },
  {
    "name": "Antu, Uttar Pradesh, India",
    "lat": 26.05654,
    "lng": 81.90267
  },
  {
    "name": "Anupgarh, Rajasthan, India",
    "lat": 29.19111,
    "lng": 73.20861
  },
  {
    "name": "Anuppur, Madhya Pradesh, India",
    "lat": 23.05674,
    "lng": 81.68399
  },
  {
    "name": "Anupshahr, Uttar Pradesh, India",
    "lat": 28.35748,
    "lng": 78.26914
  },
  {
    "name": "Aonla, Uttar Pradesh, India",
    "lat": 28.27402,
    "lng": 79.16521
  },
  {
    "name": "Arag, Maharashtra, India",
    "lat": 16.78,
    "lng": 74.8
  },
  {
    "name": "Arakkonam, Tamil Nadu, India",
    "lat": 13.08449,
    "lng": 79.67053
  },
  {
    "name": "Arambagh community development block, West Bengal, India",
    "lat": 22.88,
    "lng": 87.78
  },
  {
    "name": "Arambol, Goa, India",
    "lat": 15.68681,
    "lng": 73.70449
  },
  {
    "name": "Arang, Chhattisgarh, India",
    "lat": 21.19639,
    "lng": 81.96912
  },
  {
    "name": "Arangaon, Maharashtra, India",
    "lat": 19.02681,
    "lng": 74.71487
  },
  {
    "name": "Arantangi, Tamil Nadu, India",
    "lat": 10.17235,
    "lng": 78.99118
  },
  {
    "name": "Araria, Bihar, India",
    "lat": 26.2,
    "lng": 87.4
  },
  {
    "name": "Araul, Uttar Pradesh, India",
    "lat": 26.917,
    "lng": 80.033
  },
  {
    "name": "Arcot, Tamil Nadu, India",
    "lat": 12.90569,
    "lng": 79.31897
  },
  {
    "name": "Ardhapur, Maharashtra, India",
    "lat": 19.28333333,
    "lng": 77.38333333
  },
  {
    "name": "Argaon, Maharashtra, India",
    "lat": 16.778999,
    "lng": 73.64553
  },
  {
    "name": "Arimalam, Tamil Nadu, India",
    "lat": 10.25498,
    "lng": 78.88403
  },
  {
    "name": "Ariyalur, Tamil Nadu, India",
    "lat": 11.15,
    "lng": 79.25
  },
  {
    "name": "Arkalgud, Karnataka, India",
    "lat": 12.76171,
    "lng": 76.06035
  },
  {
    "name": "Arki, Himachal Pradesh, India",
    "lat": 31.15196,
    "lng": 76.96675
  },
  {
    "name": "Arni, Tamil Nadu, India",
    "lat": 12.66771,
    "lng": 79.28529
  },
  {
    "name": "Aron, Madhya Pradesh, India",
    "lat": 24.38109,
    "lng": 77.41739
  },
  {
    "name": "Aroor, Kerala, India",
    "lat": 9.8694,
    "lng": 76.30498
  },
  {
    "name": "Arrah, Bihar, India",
    "lat": 25.55629,
    "lng": 84.66335
  },
  {
    "name": "Arsikere, Karnataka, India",
    "lat": 13.31446,
    "lng": 76.25704
  },
  {
    "name": "Artist Village, Maharashtra, India",
    "lat": 19.03227,
    "lng": 73.04276
  },
  {
    "name": "Arukutti, Kerala, India",
    "lat": 9.86667,
    "lng": 76.35
  },
  {
    "name": "Arumbavur, Tamil Nadu, India",
    "lat": 11.38096,
    "lng": 78.72965
  },
  {
    "name": "Arumuganeri, Tamil Nadu, India",
    "lat": 8.5688,
    "lng": 78.09091
  },
  {
    "name": "Aruppukkottai, Tamil Nadu, India",
    "lat": 9.5096,
    "lng": 78.09588
  },
  {
    "name": "Aruvankad, Tamil Nadu, India",
    "lat": 11.36315,
    "lng": 76.7579
  },
  {
    "name": "Arvi, Maharashtra, India",
    "lat": 20.99585,
    "lng": 78.22914
  },
  {
    "name": "Arwal, Bihar, India",
    "lat": 25.16158,
    "lng": 84.6904
  },
  {
    "name": "Asalatganj, Uttar Pradesh, India",
    "lat": 26.68333333,
    "lng": 79.85
  },
  {
    "name": "Asandh, Haryana, India",
    "lat": 29.52119,
    "lng": 76.60552
  },
  {
    "name": "Asansol, West Bengal, India",
    "lat": 23.68333333,
    "lng": 86.96666667
  },
  {
    "name": "Asarganj, Bihar, India",
    "lat": 25.15046,
    "lng": 86.68639
  },
  {
    "name": "Ashoknagar Kalyangarh, West Bengal, India",
    "lat": 22.833,
    "lng": 88.633
  },
  {
    "name": "Ashoknagar, Madhya Pradesh, India",
    "lat": 24.58,
    "lng": 77.73
  },
  {
    "name": "Ashta, Madhya Pradesh, India",
    "lat": 23.01754,
    "lng": 76.72208
  },
  {
    "name": "Ashta, Maharashtra, India",
    "lat": 16.94943,
    "lng": 74.40936
  },
  {
    "name": "Ashti, Maharashtra, India",
    "lat": 19.37671,
    "lng": 76.2252
  },
  {
    "name": "Asifabad, Telangana, India",
    "lat": 19.35851,
    "lng": 79.28415
  },
  {
    "name": "Asika, Odisha, India",
    "lat": 19.61114,
    "lng": 84.65998
  },
  {
    "name": "Asind, Rajasthan, India",
    "lat": 25.7342,
    "lng": 74.33278
  },
  {
    "name": "Asoda, Maharashtra, India",
    "lat": 21.03333333,
    "lng": 75.6
  },
  {
    "name": "Assaye, Maharashtra, India",
    "lat": 20.24512778,
    "lng": 75.88739722
  },
  {
    "name": "Astagaon, Maharashtra, India",
    "lat": 19.66666667,
    "lng": 74.5
  },
  {
    "name": "Atarra, Uttar Pradesh, India",
    "lat": 25.28618,
    "lng": 80.57155
  },
  {
    "name": "Ateli Mandi, Haryana, India",
    "lat": 28.1008,
    "lng": 76.2598
  },
  {
    "name": "Athagarh, Odisha, India",
    "lat": 20.51999,
    "lng": 85.62965
  },
  {
    "name": "Athni, Karnataka, India",
    "lat": 16.72613,
    "lng": 75.06421
  },
  {
    "name": "Atmakur, Andhra Pradesh, India",
    "lat": 15.88109,
    "lng": 78.58704
  },
  {
    "name": "Atrauli, Uttar Pradesh, India",
    "lat": 28.02964,
    "lng": 78.28571
  },
  {
    "name": "Atraulia, Uttar Pradesh, India",
    "lat": 26.3333,
    "lng": 82.94727
  },
  {
    "name": "Attayyampatti, Tamil Nadu, India",
    "lat": 11.53272,
    "lng": 78.05363
  },
  {
    "name": "Attili, Andhra Pradesh, India",
    "lat": 16.7,
    "lng": 81.6
  },
  {
    "name": "Attingal, Kerala, India",
    "lat": 8.69609,
    "lng": 76.81507
  },
  {
    "name": "Attur, Tamil Nadu, India",
    "lat": 11.59414,
    "lng": 78.60143
  },
  {
    "name": "Aundh Satara, Maharashtra, India",
    "lat": 17.54583333,
    "lng": 74.375
  },
  {
    "name": "Aurad, Karnataka, India",
    "lat": 18.25397,
    "lng": 77.41761
  },
  {
    "name": "Auraiya, Uttar Pradesh, India",
    "lat": 26.64692,
    "lng": 79.42858
  },
  {
    "name": "Aurangabad, Bihar, India",
    "lat": 24.75204,
    "lng": 84.3742
  },
  {
    "name": "Aurangabad, Maharashtra, India",
    "lat": 19.88467,
    "lng": 75.33986
  },
  {
    "name": "Auras, Uttar Pradesh, India",
    "lat": 26.91414,
    "lng": 80.50792
  },
  {
    "name": "Auroville, Tamil Nadu, India",
    "lat": 12.00549,
    "lng": 79.80885
  },
  {
    "name": "Ausa, Maharashtra, India",
    "lat": 18.24728,
    "lng": 76.4993
  },
  {
    "name": "Avadi, Tamil Nadu, India",
    "lat": 13.1147,
    "lng": 80.10981
  },
  {
    "name": "Avanigadda, Andhra Pradesh, India",
    "lat": 16.02148,
    "lng": 80.91808
  },
  {
    "name": "Avanoor, Kerala, India",
    "lat": 10.60826,
    "lng": 76.1762
  },
  {
    "name": "Avinashi, Tamil Nadu, India",
    "lat": 11.19297,
    "lng": 77.26865
  },
  {
    "name": "Awantipur, Jammu and Kashmir, India",
    "lat": 33.91978,
    "lng": 75.01515
  },
  {
    "name": "Ayakudi, Tamil Nadu, India",
    "lat": 10.44992,
    "lng": 77.55198
  },
  {
    "name": "Ayodhya, Uttar Pradesh, India",
    "lat": 26.79909,
    "lng": 82.2047
  },
  {
    "name": "Ayyampettai, Tamil Nadu, India",
    "lat": 10.90141,
    "lng": 79.17984
  },
  {
    "name": "Azamgarh, Uttar Pradesh, India",
    "lat": 26.06832,
    "lng": 83.18358
  },
  {
    "name": "Azhikkal, Kerala, India",
    "lat": 11.91524,
    "lng": 75.34761
  },
  {
    "name": "Azizpur, Uttar Pradesh, India",
    "lat": 26.97638889,
    "lng": 79.22138889
  },
  {
    "name": "Babai, Madhya Pradesh, India",
    "lat": 22.70256,
    "lng": 77.93494
  },
  {
    "name": "Baberu, Uttar Pradesh, India",
    "lat": 25.54711,
    "lng": 80.70443
  },
  {
    "name": "Babina, Uttar Pradesh, India",
    "lat": 25.23947,
    "lng": 78.47028
  },
  {
    "name": "Babra, Gujarat, India",
    "lat": 21.84577,
    "lng": 71.30544
  },
  {
    "name": "Babrala, Uttar Pradesh, India",
    "lat": 28.26419,
    "lng": 78.4056
  },
  {
    "name": "Babugarh, Uttar Pradesh, India",
    "lat": 28.72353,
    "lng": 77.84677
  },
  {
    "name": "Bachhraon, Uttar Pradesh, India",
    "lat": 28.92694,
    "lng": 78.23456
  },
  {
    "name": "Bachhrawan, Uttar Pradesh, India",
    "lat": 26.4709,
    "lng": 81.1158
  },
  {
    "name": "Bada Barabil, Odisha, India",
    "lat": 22.11186,
    "lng": 85.38684
  },
  {
    "name": "Badami, Karnataka, India",
    "lat": 15.91495,
    "lng": 75.67683
  },
  {
    "name": "Badarpur, Assam, India",
    "lat": 24.86852,
    "lng": 92.59606
  },
  {
    "name": "Badarwas, Madhya Pradesh, India",
    "lat": 24.97516,
    "lng": 77.5649
  },
  {
    "name": "Baddi, Himachal Pradesh, India",
    "lat": 30.95783,
    "lng": 76.79136
  },
  {
    "name": "Badgam, Jammu and Kashmir, India",
    "lat": 33.89001,
    "lng": 74.66297
  },
  {
    "name": "Badhni Kalan, Punjab, India",
    "lat": 30.6813,
    "lng": 75.29087
  },
  {
    "name": "Badkulla, West Bengal, India",
    "lat": 23.28,
    "lng": 88.53
  },
  {
    "name": "Badlapur, Maharashtra, India",
    "lat": 19.15516,
    "lng": 73.26553
  },
  {
    "name": "Badnapur, Maharashtra, India",
    "lat": 19.86666667,
    "lng": 75.73333333
  },
  {
    "name": "Badnawar, Madhya Pradesh, India",
    "lat": 23.02181,
    "lng": 75.23268
  },
  {
    "name": "Badnera, Maharashtra, India",
    "lat": 20.85463056,
    "lng": 77.72931111
  },
  {
    "name": "Baduria, West Bengal, India",
    "lat": 22.74,
    "lng": 88.79
  },
  {
    "name": "Badvel, Andhra Pradesh, India",
    "lat": 14.7451,
    "lng": 79.06288
  },
  {
    "name": "Baga, Goa, India",
    "lat": 15.56517,
    "lng": 73.75517
  },
  {
    "name": "Bagaha, Bihar, India",
    "lat": 27.09918,
    "lng": 84.09003
  },
  {
    "name": "Bagalkot, Karnataka, India",
    "lat": 16.18,
    "lng": 75.69
  },
  {
    "name": "Bagar, Rajasthan, India",
    "lat": 28.18784,
    "lng": 75.50012
  },
  {
    "name": "Bagasara, Gujarat, India",
    "lat": 21.48333333,
    "lng": 70.95
  },
  {
    "name": "Bagasra, Gujarat, India",
    "lat": 21.48719,
    "lng": 70.95516
  },
  {
    "name": "Bagdogra, West Bengal, India",
    "lat": 26.699804,
    "lng": 88.319392
  },
  {
    "name": "Bagepalli, Karnataka, India",
    "lat": 13.78338,
    "lng": 77.79667
  },
  {
    "name": "Bageshwar, Uttarakhand, India",
    "lat": 29.97315,
    "lng": 79.83224
  },
  {
    "name": "Bagewadi, Maharashtra, India",
    "lat": 16.29,
    "lng": 74.6
  },
  {
    "name": "Bagh, Madhya Pradesh, India",
    "lat": 22.35905,
    "lng": 74.79052
  },
  {
    "name": "Bagha Purana, Punjab, India",
    "lat": 30.68809,
    "lng": 75.09838
  },
  {
    "name": "Baghpat, Uttar Pradesh, India",
    "lat": 28.95,
    "lng": 77.2167
  },
  {
    "name": "Baghra, Uttar Pradesh, India",
    "lat": 29.46666667,
    "lng": 77.58333333
  },
  {
    "name": "Bagli, Madhya Pradesh, India",
    "lat": 22.64124,
    "lng": 76.34877
  },
  {
    "name": "Bagnan, West Bengal, India",
    "lat": 22.47,
    "lng": 87.97
  },
  {
    "name": "Bagra, Jharkhand, India",
    "lat": 23.73333,
    "lng": 86.31667
  },
  {
    "name": "Bagula, West Bengal, India",
    "lat": 23.335,
    "lng": 88.644
  },
  {
    "name": "Bah, Uttar Pradesh, India",
    "lat": 26.86912,
    "lng": 78.59385
  },
  {
    "name": "Bahadurganj, Bihar, India",
    "lat": 26.26172,
    "lng": 87.82443
  },
  {
    "name": "Bahadurgarh, Haryana, India",
    "lat": 28.69287,
    "lng": 76.93555
  },
  {
    "name": "Baheri, Uttar Pradesh, India",
    "lat": 28.77416,
    "lng": 79.4974
  },
  {
    "name": "Bahjoi, Uttar Pradesh, India",
    "lat": 28.39502,
    "lng": 78.62659
  },
  {
    "name": "Bahraich, Uttar Pradesh, India",
    "lat": 27.80021,
    "lng": 81.51855
  },
  {
    "name": "Bahraigh, Uttar Pradesh, India",
    "lat": 27.57429,
    "lng": 81.59474
  },
  {
    "name": "Bahsuma, Uttar Pradesh, India",
    "lat": 29.20063,
    "lng": 77.97221
  },
  {
    "name": "Bahua, Uttar Pradesh, India",
    "lat": 25.83942,
    "lng": 80.62255
  },
  {
    "name": "Bahula, West Bengal, India",
    "lat": 23.657419,
    "lng": 87.195974
  },
  {
    "name": "Baidyabati, West Bengal, India",
    "lat": 22.79,
    "lng": 88.32
  },
  {
    "name": "Baihar, Madhya Pradesh, India",
    "lat": 22.10133,
    "lng": 80.54967
  },
  {
    "name": "Baikunthpur, Chhattisgarh, India",
    "lat": 23.26206,
    "lng": 82.56051
  },
  {
    "name": "Baikunthpur, Madhya Pradesh, India",
    "lat": 24.72768,
    "lng": 81.40975
  },
  {
    "name": "Bail-Hongal, Karnataka, India",
    "lat": 15.8137,
    "lng": 74.85895
  },
  {
    "name": "Bairagnia, Bihar, India",
    "lat": 26.74063,
    "lng": 85.27323
  },
  {
    "name": "Baisi, Bihar, India",
    "lat": 25.86302,
    "lng": 87.74487
  },
  {
    "name": "Bajna, Uttar Pradesh, India",
    "lat": 27.89793,
    "lng": 77.67836
  },
  {
    "name": "Bakani, Rajasthan, India",
    "lat": 24.28624,
    "lng": 76.23709
  },
  {
    "name": "Bakewar, Uttar Pradesh, India",
    "lat": 26.66226,
    "lng": 79.17625
  },
  {
    "name": "Bakharla, Gujarat, India",
    "lat": 21.731517,
    "lng": 69.635296
  },
  {
    "name": "Bakhtiyarpur, Bihar, India",
    "lat": 25.46179,
    "lng": 85.53179
  },
  {
    "name": "Bakloh, Punjab, India",
    "lat": 32.47939,
    "lng": 75.91874
  },
  {
    "name": "Bakreswar, West Bengal, India",
    "lat": 23.8832,
    "lng": 87.37265
  },
  {
    "name": "Baksa, Assam, India",
    "lat": 26.69804,
    "lng": 91.15142
  },
  {
    "name": "Baksar, Uttar Pradesh, India",
    "lat": 28.76666667,
    "lng": 78.01666667
  },
  {
    "name": "Bakshwaha, Madhya Pradesh, India",
    "lat": 24.25106,
    "lng": 79.28618
  },
  {
    "name": "Balachor, Punjab, India",
    "lat": 31.06062,
    "lng": 76.30166
  },
  {
    "name": "Balagam, Gujarat, India",
    "lat": 21.36666667,
    "lng": 70.1
  },
  {
    "name": "Balaghat, Madhya Pradesh, India",
    "lat": 21.96667,
    "lng": 80.33333
  },
  {
    "name": "Balamau, Uttar Pradesh, India",
    "lat": 27.16666667,
    "lng": 80.35
  },
  {
    "name": "Balangir, Odisha, India",
    "lat": 20.75,
    "lng": 83.25
  },
  {
    "name": "Balapur, Maharashtra, India",
    "lat": 20.7326962,
    "lng": 76.8363281
  },
  {
    "name": "Balapur, Telangana, India",
    "lat": 17.31018,
    "lng": 78.49969
  },
  {
    "name": "Balarampur, West Bengal, India",
    "lat": 23.09714,
    "lng": 86.22292
  },
  {
    "name": "Balasinor, Gujarat, India",
    "lat": 22.955891,
    "lng": 73.336499
  },
  {
    "name": "Balasore, Odisha, India",
    "lat": 21.49266,
    "lng": 86.93348
  },
  {
    "name": "Baldeo, Uttar Pradesh, India",
    "lat": 27.41666667,
    "lng": 77.81666667
  },
  {
    "name": "Baldeogarh, Madhya Pradesh, India",
    "lat": 24.75619,
    "lng": 79.06715
  },
  {
    "name": "Baldev, Uttar Pradesh, India",
    "lat": 27.40684,
    "lng": 77.82214
  },
  {
    "name": "Baleshwar, Odisha, India",
    "lat": 21.5,
    "lng": 86.75
  },
  {
    "name": "Bali Chak, West Bengal, India",
    "lat": 22.36482,
    "lng": 87.55304
  },
  {
    "name": "Bali, Rajasthan, India",
    "lat": 25.19725,
    "lng": 73.29117
  },
  {
    "name": "Balimila, Odisha, India",
    "lat": 18.25167,
    "lng": 82.10659
  },
  {
    "name": "Balisana, Gujarat, India",
    "lat": 23.816436,
    "lng": 72.257536
  },
  {
    "name": "Ballalpur, Maharashtra, India",
    "lat": 19.84696,
    "lng": 79.34578
  },
  {
    "name": "Ballard Estate, Maharashtra, India",
    "lat": 18.95,
    "lng": 72.84
  },
  {
    "name": "Ballari, Karnataka, India",
    "lat": 15.15,
    "lng": 76.55
  },
  {
    "name": "Ballarpur, Maharashtra, India",
    "lat": 19.83333333,
    "lng": 79.35
  },
  {
    "name": "Ballia, Uttar Pradesh, India",
    "lat": 25.83333,
    "lng": 84.16667
  },
  {
    "name": "Bally, West Bengal, India",
    "lat": 22.65,
    "lng": 88.34
  },
  {
    "name": "Balod, Chhattisgarh, India",
    "lat": 20.73081,
    "lng": 81.20578
  },
  {
    "name": "Baloda Bazar, Chhattisgarh, India",
    "lat": 21.65678,
    "lng": 82.16062
  },
  {
    "name": "Baloda, Chhattisgarh, India",
    "lat": 22.1389,
    "lng": 82.48171
  },
  {
    "name": "Balotra, Rajasthan, India",
    "lat": 25.83242,
    "lng": 72.24
  },
  {
    "name": "Balrampur, Uttar Pradesh, India",
    "lat": 27.43449,
    "lng": 82.40281
  },
  {
    "name": "Balugaon, Odisha, India",
    "lat": 20.17838,
    "lng": 85.11327
  },
  {
    "name": "Balurghat, West Bengal, India",
    "lat": 25.21666667,
    "lng": 88.76666667
  },
  {
    "name": "Bamanbore, Gujarat, India",
    "lat": 22.41666667,
    "lng": 71.01666667
  },
  {
    "name": "Bamangola community development block, West Bengal, India",
    "lat": 25.17,
    "lng": 88.335
  },
  {
    "name": "Bambolim, Goa, India",
    "lat": 15.46361,
    "lng": 73.8531
  },
  {
    "name": "Bamboo Flat, Andaman and Nicobar Islands, India",
    "lat": 11.7,
    "lng": 92.71667
  },
  {
    "name": "Bamna, Madhya Pradesh, India",
    "lat": 23.09454,
    "lng": 74.76164
  },
  {
    "name": "Bamor Kalan, Madhya Pradesh, India",
    "lat": 24.89298,
    "lng": 78.15105
  },
  {
    "name": "Bamora, Madhya Pradesh, India",
    "lat": 24.05539,
    "lng": 78.08925
  },
  {
    "name": "Banapur, Odisha, India",
    "lat": 19.77889,
    "lng": 85.17033
  },
  {
    "name": "Banas Kantha, Gujarat, India",
    "lat": 24.25,
    "lng": 72.5
  },
  {
    "name": "Banat, Uttar Pradesh, India",
    "lat": 29.46355,
    "lng": 77.35478
  },
  {
    "name": "Banavar, Karnataka, India",
    "lat": 13.41029,
    "lng": 76.16314
  },
  {
    "name": "Banbasa, Uttarakhand, India",
    "lat": 28.99132,
    "lng": 80.07608
  },
  {
    "name": "Banda Maharashtra, Maharashtra, India",
    "lat": 15.81273611,
    "lng": 73.86132778
  },
  {
    "name": "Banda, Madhya Pradesh, India",
    "lat": 24.04488,
    "lng": 78.96094
  },
  {
    "name": "Banda, Uttar Pradesh, India",
    "lat": 25.5,
    "lng": 80.5
  },
  {
    "name": "Bandia, Gujarat, India",
    "lat": 23.39604,
    "lng": 69.01155
  },
  {
    "name": "Bandikui, Rajasthan, India",
    "lat": 27.05087,
    "lng": 76.57325
  },
  {
    "name": "Bandipore, Jammu and Kashmir, India",
    "lat": 34.50404,
    "lng": 74.82832
  },
  {
    "name": "Bandora, Goa, India",
    "lat": 15.40823,
    "lng": 73.98129
  },
  {
    "name": "Bandra, Maharashtra, India",
    "lat": 19.05444444,
    "lng": 72.84055556
  },
  {
    "name": "Baner, Maharashtra, India",
    "lat": 18.56,
    "lng": 73.79027778
  },
  {
    "name": "Baneswar, West Bengal, India",
    "lat": 26.65,
    "lng": 89.81666667
  },
  {
    "name": "Banga, Punjab, India",
    "lat": 31.18874,
    "lng": 75.99495
  },
  {
    "name": "Banganapalle, Andhra Pradesh, India",
    "lat": 15.31771,
    "lng": 78.22669
  },
  {
    "name": "Bangaon, Bihar, India",
    "lat": 25.86728,
    "lng": 86.51152
  },
  {
    "name": "Bangaon, West Bengal, India",
    "lat": 23.07,
    "lng": 88.82
  },
  {
    "name": "Bangarapet, Karnataka, India",
    "lat": 12.99116,
    "lng": 78.17804
  },
  {
    "name": "Bangarmau, Uttar Pradesh, India",
    "lat": 26.8912,
    "lng": 80.21149
  },
  {
    "name": "Bangkok, Thailand",
    "lat": 13.7563,
    "lng": 100.5018
  },
  {
    "name": "Banihal, Jammu and Kashmir, India",
    "lat": 33.43647,
    "lng": 75.19684
  },
  {
    "name": "Banjar, Himachal Pradesh, India",
    "lat": 31.639,
    "lng": 77.34055
  },
  {
    "name": "Banka, Bihar, India",
    "lat": 24.89214,
    "lng": 86.98425
  },
  {
    "name": "Banki, Odisha, India",
    "lat": 20.37912,
    "lng": 85.52953
  },
  {
    "name": "Bankot, Maharashtra, India",
    "lat": 17.98333333,
    "lng": 73.05
  },
  {
    "name": "Bankra, West Bengal, India",
    "lat": 22.63,
    "lng": 88.3
  },
  {
    "name": "Bankura, West Bengal, India",
    "lat": 23.25,
    "lng": 87.06666667
  },
  {
    "name": "Banmankhi, Bihar, India",
    "lat": 25.88857,
    "lng": 87.19421
  },
  {
    "name": "Bannur, Karnataka, India",
    "lat": 12.33295,
    "lng": 76.86201
  },
  {
    "name": "Banposh, Odisha, India",
    "lat": 22.24834,
    "lng": 84.81044
  },
  {
    "name": "Bansberia, West Bengal, India",
    "lat": 22.97,
    "lng": 88.4
  },
  {
    "name": "Bansdih, Uttar Pradesh, India",
    "lat": 25.88377,
    "lng": 84.21827
  },
  {
    "name": "Bansgaon, Uttar Pradesh, India",
    "lat": 26.55032,
    "lng": 83.34503
  },
  {
    "name": "Bansi, Uttar Pradesh, India",
    "lat": 27.17749,
    "lng": 82.93442
  },
  {
    "name": "Bansihari community development block, West Bengal, India",
    "lat": 25.4,
    "lng": 88.4167
  },
  {
    "name": "Banswada, Telangana, India",
    "lat": 18.37725,
    "lng": 77.88007
  },
  {
    "name": "Banswara, Rajasthan, India",
    "lat": 23.54109,
    "lng": 74.4425
  },
  {
    "name": "Banthra, Uttar Pradesh, India",
    "lat": 27.9172,
    "lng": 79.8174
  },
  {
    "name": "Bantva, Gujarat, India",
    "lat": 21.48815,
    "lng": 70.07576
  },
  {
    "name": "Bantval, Karnataka, India",
    "lat": 12.8905,
    "lng": 75.03489
  },
  {
    "name": "Banur, Punjab, India",
    "lat": 30.55407,
    "lng": 76.71948
  },
  {
    "name": "Bapatla, Andhra Pradesh, India",
    "lat": 15.90422,
    "lng": 80.46743
  },
  {
    "name": "Bar Bigha, Bihar, India",
    "lat": 25.21855,
    "lng": 85.7332
  },
  {
    "name": "Bara Banki, Uttar Pradesh, India",
    "lat": 26.93864,
    "lng": 81.3274
  },
  {
    "name": "Bara Uchana, Haryana, India",
    "lat": 29.46747,
    "lng": 76.17798
  },
  {
    "name": "Barabazar, West Bengal, India",
    "lat": 23.36,
    "lng": 86.65
  },
  {
    "name": "Baragaon, Uttar Pradesh, India",
    "lat": 25.47554,
    "lng": 78.71224
  },
  {
    "name": "Baragarh, Odisha, India",
    "lat": 21.33333,
    "lng": 83.61667
  },
  {
    "name": "Baramati, Maharashtra, India",
    "lat": 18.15174,
    "lng": 74.57767
  },
  {
    "name": "Baramula, Jammu and Kashmir, India",
    "lat": 34.19287,
    "lng": 74.3692
  },
  {
    "name": "Baran, Rajasthan, India",
    "lat": 25.09,
    "lng": 76.66
  },
  {
    "name": "Baranagar, West Bengal, India",
    "lat": 22.64,
    "lng": 88.37
  },
  {
    "name": "Barasat, West Bengal, India",
    "lat": 22.23333333,
    "lng": 88.45
  },
  {
    "name": "Barauli, Bihar, India",
    "lat": 26.38109,
    "lng": 84.58648
  },
  {
    "name": "Baraut, Uttar Pradesh, India",
    "lat": 29.10199,
    "lng": 77.26334
  },
  {
    "name": "Barbil, Odisha, India",
    "lat": 22.10194,
    "lng": 85.37752
  },
  {
    "name": "Barcelona, Spain",
    "lat": 41.3851,
    "lng": 2.1734
  },
  {
    "name": "Bardhaman, West Bengal, India",
    "lat": 23.25,
    "lng": 87.85
  },
  {
    "name": "Bardoli, Gujarat, India",
    "lat": 21.12297,
    "lng": 73.11151
  },
  {
    "name": "Bareilly, Uttar Pradesh, India",
    "lat": 28.41667,
    "lng": 79.38333
  },
  {
    "name": "Barela, Madhya Pradesh, India",
    "lat": 23.09678,
    "lng": 80.05084
  },
  {
    "name": "Bargarh, Odisha, India",
    "lat": 21.33348,
    "lng": 83.61905
  },
  {
    "name": "Barghat, Madhya Pradesh, India",
    "lat": 22.03065,
    "lng": 79.7328
  },
  {
    "name": "Bargi, Madhya Pradesh, India",
    "lat": 22.99138,
    "lng": 79.8755
  },
  {
    "name": "Barh, Bihar, India",
    "lat": 25.48339,
    "lng": 85.70928
  },
  {
    "name": "Barhalganj, Uttar Pradesh, India",
    "lat": 26.28333333,
    "lng": 83.5
  },
  {
    "name": "Barhi, Madhya Pradesh, India",
    "lat": 23.90326,
    "lng": 80.81516
  },
  {
    "name": "Barhiya, Bihar, India",
    "lat": 25.28814,
    "lng": 86.02055
  },
  {
    "name": "Bari Sadri, Rajasthan, India",
    "lat": 24.41339,
    "lng": 74.47331
  },
  {
    "name": "Bari, Rajasthan, India",
    "lat": 26.64661,
    "lng": 77.61634
  },
  {
    "name": "Bariarpur, Bihar, India",
    "lat": 25.28791,
    "lng": 86.57643
  },
  {
    "name": "Barjala, Tripura, India",
    "lat": 23.6182,
    "lng": 91.35596
  },
  {
    "name": "Barjora, West Bengal, India",
    "lat": 23.43333333,
    "lng": 87.28333333
  },
  {
    "name": "Barka Kana, Jharkhand, India",
    "lat": 23.62118,
    "lng": 85.46748
  },
  {
    "name": "Barkhera Kalan, Uttar Pradesh, India",
    "lat": 28.45209,
    "lng": 79.80655
  },
  {
    "name": "Barkhera, Uttar Pradesh, India",
    "lat": 28.45,
    "lng": 79.8
  },
  {
    "name": "Barki Saria, Jharkhand, India",
    "lat": 24.17594,
    "lng": 85.88938
  },
  {
    "name": "Barkot, Uttarakhand, India",
    "lat": 30.80861,
    "lng": 78.20596
  },
  {
    "name": "Barmer, Rajasthan, India",
    "lat": 25.75,
    "lng": 71.5
  },
  {
    "name": "Barnala, Punjab, India",
    "lat": 30.37451,
    "lng": 75.5487
  },
  {
    "name": "Barokhar, Uttar Pradesh, India",
    "lat": 24.91666667,
    "lng": 81.96666667
  },
  {
    "name": "Barpali, Odisha, India",
    "lat": 21.19005,
    "lng": 83.58721
  },
  {
    "name": "Barpathar, Assam, India",
    "lat": 26.28709,
    "lng": 93.88844
  },
  {
    "name": "Barpeta Road, Assam, India",
    "lat": 26.50284,
    "lng": 90.96937
  },
  {
    "name": "Barpeta, Assam, India",
    "lat": 26.47104,
    "lng": 91.0308
  },
  {
    "name": "Barrackpore, West Bengal, India",
    "lat": 22.75,
    "lng": 88.36666667
  },
  {
    "name": "Barsana, Uttar Pradesh, India",
    "lat": 27.64802,
    "lng": 77.3764
  },
  {
    "name": "Barsi, Maharashtra, India",
    "lat": 18.23454,
    "lng": 75.69275
  },
  {
    "name": "Baruipur, West Bengal, India",
    "lat": 22.35,
    "lng": 88.44
  },
  {
    "name": "Baruni, Bihar, India",
    "lat": 25.47509,
    "lng": 85.96813
  },
  {
    "name": "Barwadih, Jharkhand, India",
    "lat": 23.8478,
    "lng": 84.11049
  },
  {
    "name": "Barwala, Haryana, India",
    "lat": 29.36747,
    "lng": 75.90809
  },
  {
    "name": "Barwani, Madhya Pradesh, India",
    "lat": 22.02485,
    "lng": 74.91805
  },
  {
    "name": "Barwar (Lakhimpur Kheri), Uttar Pradesh, India",
    "lat": 25.50583333,
    "lng": 79.13972222
  },
  {
    "name": "Basanti, West Bengal, India",
    "lat": 22.1891534,
    "lng": 88.6705685
  },
  {
    "name": "Basar, Arunachal Pradesh, India",
    "lat": 27.99008,
    "lng": 94.69451
  },
  {
    "name": "Basavakalyan, Karnataka, India",
    "lat": 17.87445,
    "lng": 76.94972
  },
  {
    "name": "Basavana Bagevadi, Karnataka, India",
    "lat": 16.57278,
    "lng": 75.97252
  },
  {
    "name": "Basi, Rajasthan, India",
    "lat": 26.8315,
    "lng": 76.04856
  },
  {
    "name": "Basirhat, West Bengal, India",
    "lat": 22.65722222,
    "lng": 88.89416667
  },
  {
    "name": "Basmat, Maharashtra, India",
    "lat": 19.32872,
    "lng": 77.15746
  },
  {
    "name": "Basna, Chhattisgarh, India",
    "lat": 21.27885,
    "lng": 82.8267
  },
  {
    "name": "Basni, Rajasthan, India",
    "lat": 27.17232,
    "lng": 73.64519
  },
  {
    "name": "Basoda, Madhya Pradesh, India",
    "lat": 23.85153,
    "lng": 77.93652
  },
  {
    "name": "Bastar, Chhattisgarh, India",
    "lat": 19.26794,
    "lng": 81.73828
  },
  {
    "name": "Basti, Uttar Pradesh, India",
    "lat": 26.82816,
    "lng": 82.77924
  },
  {
    "name": "Basudebpur, Odisha, India",
    "lat": 21.11974,
    "lng": 86.72896
  },
  {
    "name": "Basugaon, Assam, India",
    "lat": 26.46742,
    "lng": 90.41951
  },
  {
    "name": "Baswa, Rajasthan, India",
    "lat": 27.14955,
    "lng": 76.58345
  },
  {
    "name": "Batala, Punjab, India",
    "lat": 31.80921,
    "lng": 75.20294
  },
  {
    "name": "Batoti, Jammu and Kashmir, India",
    "lat": 33.11826,
    "lng": 75.30889
  },
  {
    "name": "Baud, Odisha, India",
    "lat": 20.83773,
    "lng": 84.32618
  },
  {
    "name": "Baudh, Odisha, India",
    "lat": 20.833,
    "lng": 84.333
  },
  {
    "name": "Bavdhan, Maharashtra, India",
    "lat": 18.53527778,
    "lng": 73.78277778
  },
  {
    "name": "Bavla, Gujarat, India",
    "lat": 22.83672406,
    "lng": 72.36277938
  },
  {
    "name": "Bawal, Haryana, India",
    "lat": 28.07184,
    "lng": 76.58312
  },
  {
    "name": "Bawali, West Bengal, India",
    "lat": 22.42563,
    "lng": 88.19336
  },
  {
    "name": "Bawana, Delhi, India",
    "lat": 28.7982,
    "lng": 77.03431
  },
  {
    "name": "Bawanbir, Maharashtra, India",
    "lat": 21.08333333,
    "lng": 76.71666667
  },
  {
    "name": "Bayana, Rajasthan, India",
    "lat": 26.90791,
    "lng": 77.28985
  },
  {
    "name": "Bazpur, Uttarakhand, India",
    "lat": 29.15299,
    "lng": 79.10814
  },
  {
    "name": "Beawar, Rajasthan, India",
    "lat": 26.10119,
    "lng": 74.32028
  },
  {
    "name": "Bedi, Gujarat, India",
    "lat": 22.50143,
    "lng": 70.04363
  },
  {
    "name": "Beed, Maharashtra, India",
    "lat": 18.98921,
    "lng": 75.75634
  },
  {
    "name": "Begamganj, Madhya Pradesh, India",
    "lat": 23.59917,
    "lng": 78.34064
  },
  {
    "name": "Begampur, West Bengal, India",
    "lat": 22.74,
    "lng": 88.24
  },
  {
    "name": "Begowal, Punjab, India",
    "lat": 31.61152,
    "lng": 75.52135
  },
  {
    "name": "Begun, Rajasthan, India",
    "lat": 24.98333,
    "lng": 75
  },
  {
    "name": "Begusarai, Bihar, India",
    "lat": 25.41853,
    "lng": 86.13389
  },
  {
    "name": "Behat, Uttar Pradesh, India",
    "lat": 30.1718,
    "lng": 77.6139
  },
  {
    "name": "Behror, Rajasthan, India",
    "lat": 27.88832,
    "lng": 76.28108
  },
  {
    "name": "Beijing, China",
    "lat": 39.9042,
    "lng": 116.4074
  },
  {
    "name": "Bela, Uttar Pradesh, India",
    "lat": 25.92058,
    "lng": 81.99629
  },
  {
    "name": "Belagavi, Karnataka, India",
    "lat": 16.33333,
    "lng": 74.75
  },
  {
    "name": "Belaguntha, Odisha, India",
    "lat": 19.88249,
    "lng": 84.63801
  },
  {
    "name": "Belda, West Bengal, India",
    "lat": 22.08,
    "lng": 87.35
  },
  {
    "name": "Beldanga, West Bengal, India",
    "lat": 23.93,
    "lng": 88.25
  },
  {
    "name": "Beliatore, West Bengal, India",
    "lat": 23.33333333,
    "lng": 87.21666667
  },
  {
    "name": "Bellampalli, Telangana, India",
    "lat": 19.05577,
    "lng": 79.493
  },
  {
    "name": "Belluru, Karnataka, India",
    "lat": 12.9814,
    "lng": 76.73308
  },
  {
    "name": "Belonia, Tripura, India",
    "lat": 23.25178,
    "lng": 91.45407
  },
  {
    "name": "Belsand, Bihar, India",
    "lat": 26.44365,
    "lng": 85.40076
  },
  {
    "name": "Beltangadi, Karnataka, India",
    "lat": 13.98333,
    "lng": 75.3
  },
  {
    "name": "Belthara, Uttar Pradesh, India",
    "lat": 26.12694444,
    "lng": 83.89138889
  },
  {
    "name": "Belur, Karnataka, India",
    "lat": 13.16558,
    "lng": 75.86519
  },
  {
    "name": "Belur, Tamil Nadu, India",
    "lat": 11.70752,
    "lng": 78.41437
  },
  {
    "name": "Bemetara, Chhattisgarh, India",
    "lat": 21.71556,
    "lng": 81.53423
  },
  {
    "name": "Benaulim, Goa, India",
    "lat": 15.26435,
    "lng": 73.92812
  },
  {
    "name": "Bengaluru Rural, Karnataka, India",
    "lat": 13.22567,
    "lng": 77.57501
  },
  {
    "name": "Bengaluru Urban, Karnataka, India",
    "lat": 13,
    "lng": 77.58333
  },
  {
    "name": "Bengaluru, Karnataka, India",
    "lat": 12.97194,
    "lng": 77.59369
  },
  {
    "name": "Beniganj, Uttar Pradesh, India",
    "lat": 27.29293,
    "lng": 80.44364
  },
  {
    "name": "Beohari, Madhya Pradesh, India",
    "lat": 24.02423,
    "lng": 81.37831
  },
  {
    "name": "Berasia, Madhya Pradesh, India",
    "lat": 23.63134,
    "lng": 77.43351
  },
  {
    "name": "Berhampore, West Bengal, India",
    "lat": 24.1,
    "lng": 88.25
  },
  {
    "name": "Beri Khas, Haryana, India",
    "lat": 28.70146,
    "lng": 76.57708
  },
  {
    "name": "Berlin, Germany",
    "lat": 52.52,
    "lng": 13.405
  },
  {
    "name": "Beswan, Uttar Pradesh, India",
    "lat": 27.63792,
    "lng": 77.88019
  },
  {
    "name": "Betamcherla, Andhra Pradesh, India",
    "lat": 15.45144,
    "lng": 78.14797
  },
  {
    "name": "Betma, Madhya Pradesh, India",
    "lat": 22.68653,
    "lng": 75.61456
  },
  {
    "name": "Bettiah, Bihar, India",
    "lat": 26.80229,
    "lng": 84.50311
  },
  {
    "name": "Betul Bazar, Madhya Pradesh, India",
    "lat": 21.85572,
    "lng": 77.92913
  },
  {
    "name": "Betul, Madhya Pradesh, India",
    "lat": 21.83333,
    "lng": 77.83333
  },
  {
    "name": "Bewar, Uttar Pradesh, India",
    "lat": 27.21869,
    "lng": 79.29761
  },
  {
    "name": "Beypore, Kerala, India",
    "lat": 11.17151,
    "lng": 75.80611
  },
  {
    "name": "Bhabhra, Madhya Pradesh, India",
    "lat": 22.53048,
    "lng": 74.32846
  },
  {
    "name": "Bhabhua, Bihar, India",
    "lat": 25.04049,
    "lng": 83.60749
  },
  {
    "name": "Bhachau, Gujarat, India",
    "lat": 23.29858,
    "lng": 70.34279
  },
  {
    "name": "Bhadarsa, Uttar Pradesh, India",
    "lat": 26.66027778,
    "lng": 82.12416667
  },
  {
    "name": "Bhadarwah, Jammu and Kashmir, India",
    "lat": 32.97941,
    "lng": 75.71723
  },
  {
    "name": "Bhadasar, Rajasthan, India",
    "lat": 28.31457,
    "lng": 74.28952
  },
  {
    "name": "Bhadaur, Punjab, India",
    "lat": 30.47651,
    "lng": 75.33049
  },
  {
    "name": "Bhadgaon Maharashtra, Maharashtra, India",
    "lat": 20.16666667,
    "lng": 75.23333333
  },
  {
    "name": "Bhadohi, Uttar Pradesh, India",
    "lat": 25.39526,
    "lng": 82.5703
  },
  {
    "name": "Bhadra, Rajasthan, India",
    "lat": 29.10298,
    "lng": 75.17138
  },
  {
    "name": "Bhadrachalam, Telangana, India",
    "lat": 17.66846,
    "lng": 80.88887
  },
  {
    "name": "Bhadradri Kothagudem, Telangana, India",
    "lat": 17.5546,
    "lng": 80.61976
  },
  {
    "name": "Bhadrak, Odisha, India",
    "lat": 21,
    "lng": 86.6
  },
  {
    "name": "Bhadrakh, Odisha, India",
    "lat": 21.05447,
    "lng": 86.5156
  },
  {
    "name": "Bhadran, Gujarat, India",
    "lat": 22.3593,
    "lng": 72.9005
  },
  {
    "name": "Bhadravati, Karnataka, India",
    "lat": 13.84846,
    "lng": 75.70502
  },
  {
    "name": "Bhadreswar, West Bengal, India",
    "lat": 22.82,
    "lng": 88.35
  },
  {
    "name": "Bhagalpur, Bihar, India",
    "lat": 25.29023,
    "lng": 87.06665
  },
  {
    "name": "Bhagirathpur, Bihar, India",
    "lat": 26.2695,
    "lng": 86.06346
  },
  {
    "name": "Bhagwantnagar, Uttar Pradesh, India",
    "lat": 26.22383,
    "lng": 80.7575
  },
  {
    "name": "Bhainsdehi, Madhya Pradesh, India",
    "lat": 21.64491,
    "lng": 77.63023
  },
  {
    "name": "Bhaisa, Telangana, India",
    "lat": 19.11285,
    "lng": 77.96336
  },
  {
    "name": "Bhalki, Karnataka, India",
    "lat": 18.04348,
    "lng": 77.206
  },
  {
    "name": "Bhandara, Maharashtra, India",
    "lat": 21.18333,
    "lng": 80
  },
  {
    "name": "Bhandardaha, West Bengal, India",
    "lat": 22.62,
    "lng": 88.21
  },
  {
    "name": "Bhandardara, Maharashtra, India",
    "lat": 19.52916667,
    "lng": 73.75138889
  },
  {
    "name": "Bhander, Madhya Pradesh, India",
    "lat": 25.73581,
    "lng": 78.74555
  },
  {
    "name": "Bhandu, Gujarat, India",
    "lat": 23.7,
    "lng": 72.36666667
  },
  {
    "name": "Bhandup, Maharashtra, India",
    "lat": 19.14,
    "lng": 72.93
  },
  {
    "name": "Bhanjanagar, Odisha, India",
    "lat": 19.92719,
    "lng": 84.58201
  },
  {
    "name": "Bhanpura, Madhya Pradesh, India",
    "lat": 24.513,
    "lng": 75.7469
  },
  {
    "name": "Bhanpuri, Chhattisgarh, India",
    "lat": 21.0919,
    "lng": 80.93218
  },
  {
    "name": "Bhanvad, Gujarat, India",
    "lat": 21.93053,
    "lng": 69.78081
  },
  {
    "name": "Bharatpur, Rajasthan, India",
    "lat": 27.21,
    "lng": 77.29
  },
  {
    "name": "Bharatpura, Uttar Pradesh, India",
    "lat": 25.23333333,
    "lng": 78.96666667
  },
  {
    "name": "Bhargain, Uttar Pradesh, India",
    "lat": 27.615,
    "lng": 79.14416667
  },
  {
    "name": "Bharthana, Uttar Pradesh, India",
    "lat": 26.75231,
    "lng": 79.2218
  },
  {
    "name": "Bharuch, Gujarat, India",
    "lat": 21.69482,
    "lng": 72.9805
  },
  {
    "name": "Bharwari, Uttar Pradesh, India",
    "lat": 25.56078,
    "lng": 81.49164
  },
  {
    "name": "Bhasawar, Rajasthan, India",
    "lat": 27.03895,
    "lng": 77.04849
  },
  {
    "name": "Bhatapara, Chhattisgarh, India",
    "lat": 21.735,
    "lng": 81.94711
  },
  {
    "name": "Bhatgaon, Chhattisgarh, India",
    "lat": 21.15,
    "lng": 81.7
  },
  {
    "name": "Bhatha, Gujarat, India",
    "lat": 21.18333333,
    "lng": 72.76666667
  },
  {
    "name": "Bhatinda, Punjab, India",
    "lat": 30.20747,
    "lng": 74.93893
  },
  {
    "name": "Bhatkal, Karnataka, India",
    "lat": 13.98534,
    "lng": 74.55531
  },
  {
    "name": "Bhatpara, West Bengal, India",
    "lat": 22.86666667,
    "lng": 88.41666667
  },
  {
    "name": "Bhattiprolu, Andhra Pradesh, India",
    "lat": 16.1026,
    "lng": 80.78074
  },
  {
    "name": "Bhaupur, Uttar Pradesh, India",
    "lat": 26.91666667,
    "lng": 79.21666667
  },
  {
    "name": "Bhavani, Tamil Nadu, India",
    "lat": 11.44553,
    "lng": 77.68215
  },
  {
    "name": "Bhavnagar, Gujarat, India",
    "lat": 21.76287,
    "lng": 72.15331
  },
  {
    "name": "Bhawaniganj, Madhya Pradesh, India",
    "lat": 24.41582,
    "lng": 75.83552
  },
  {
    "name": "Bhawanigarh, Punjab, India",
    "lat": 30.26685,
    "lng": 76.03854
  },
  {
    "name": "Bhawanipatna, Odisha, India",
    "lat": 19.90717,
    "lng": 83.16697
  },
  {
    "name": "Bhawanipur, Bihar, India",
    "lat": 26.45352,
    "lng": 87.02744
  },
  {
    "name": "Bhayandar, Maharashtra, India",
    "lat": 19.30157,
    "lng": 72.85107
  },
  {
    "name": "Bhayavadar, Gujarat, India",
    "lat": 21.85523,
    "lng": 70.24791
  },
  {
    "name": "Bhigvan, Maharashtra, India",
    "lat": 18.3007,
    "lng": 74.76701
  },
  {
    "name": "Bhikangaon, Madhya Pradesh, India",
    "lat": 21.86764,
    "lng": 75.96391
  },
  {
    "name": "Bhikhi, Punjab, India",
    "lat": 30.05918,
    "lng": 75.535
  },
  {
    "name": "Bhilai, Chhattisgarh, India",
    "lat": 21.20919,
    "lng": 81.4285
  },
  {
    "name": "Bhildi, Gujarat, India",
    "lat": 24.18333333,
    "lng": 72.03333333
  },
  {
    "name": "Bhilwara, Rajasthan, India",
    "lat": 25.5,
    "lng": 74.75
  },
  {
    "name": "Bhim Tal, Uttarakhand, India",
    "lat": 29.34447,
    "lng": 79.56336
  },
  {
    "name": "Bhimavaram, Andhra Pradesh, India",
    "lat": 16.54078,
    "lng": 81.52322
  },
  {
    "name": "Bhimtal, Uttar Pradesh, India",
    "lat": 29.34444444,
    "lng": 79.56305556
  },
  {
    "name": "Bhimunipatnam, Andhra Pradesh, India",
    "lat": 17.89017,
    "lng": 83.45203
  },
  {
    "name": "Bhind, Madhya Pradesh, India",
    "lat": 26.5,
    "lng": 78.75
  },
  {
    "name": "Bhindar, Rajasthan, India",
    "lat": 24.50235,
    "lng": 74.18551
  },
  {
    "name": "Bhinga, Uttar Pradesh, India",
    "lat": 27.70283,
    "lng": 81.9343
  },
  {
    "name": "Bhinmal, Rajasthan, India",
    "lat": 24.99944,
    "lng": 72.27141
  },
  {
    "name": "Bhitarwar, Madhya Pradesh, India",
    "lat": 25.79216,
    "lng": 78.11085
  },
  {
    "name": "Bhiwadi, Rajasthan, India",
    "lat": 28.21024,
    "lng": 76.86056
  },
  {
    "name": "Bhiwandi, Maharashtra, India",
    "lat": 19.30023,
    "lng": 73.05881
  },
  {
    "name": "Bhiwani, Haryana, India",
    "lat": 28.75,
    "lng": 76.16667
  },
  {
    "name": "Bhiwapur, Maharashtra, India",
    "lat": 20.83555556,
    "lng": 79.50111111
  },
  {
    "name": "Bhognipur, Uttar Pradesh, India",
    "lat": 26.24,
    "lng": 79.8
  },
  {
    "name": "Bhogpur, Punjab, India",
    "lat": 31.55442,
    "lng": 75.64271
  },
  {
    "name": "Bhojpur Dharampur, Gujarat, India",
    "lat": 23.25,
    "lng": 69.67
  },
  {
    "name": "Bhojpur, Bihar, India",
    "lat": 25.30886,
    "lng": 84.44504
  },
  {
    "name": "Bhojudih, Jharkhand, India",
    "lat": 23.63962,
    "lng": 86.44105
  },
  {
    "name": "Bhokar, Maharashtra, India",
    "lat": 19.217803,
    "lng": 77.669392
  },
  {
    "name": "Bhokardan, Maharashtra, India",
    "lat": 20.27,
    "lng": 75.77
  },
  {
    "name": "Bholath, Punjab, India",
    "lat": 31.54277778,
    "lng": 75.5075
  },
  {
    "name": "Bhongaon, Uttar Pradesh, India",
    "lat": 27.25515,
    "lng": 79.18118
  },
  {
    "name": "Bhongir, Telangana, India",
    "lat": 17.51544,
    "lng": 78.88563
  },
  {
    "name": "Bhoom, Maharashtra, India",
    "lat": 18.45908,
    "lng": 75.65877
  },
  {
    "name": "Bhopal, Madhya Pradesh, India",
    "lat": 23.25469,
    "lng": 77.40289
  },
  {
    "name": "Bhor, Maharashtra, India",
    "lat": 18.14861,
    "lng": 73.84336
  },
  {
    "name": "Bhowali, Uttarakhand, India",
    "lat": 29.38985,
    "lng": 79.50481
  },
  {
    "name": "Bhuban, Odisha, India",
    "lat": 20.88197,
    "lng": 85.83334
  },
  {
    "name": "Bhubaneswar, Odisha, India",
    "lat": 20.27241,
    "lng": 85.83385
  },
  {
    "name": "Bhudgaon, Maharashtra, India",
    "lat": 16.90742,
    "lng": 74.59954
  },
  {
    "name": "Bhugaon, Maharashtra, India",
    "lat": 18.501284,
    "lng": 73.750161
  },
  {
    "name": "Bhuj, Gujarat, India",
    "lat": 23.25397,
    "lng": 69.66928
  },
  {
    "name": "Bhuma, Rajasthan, India",
    "lat": 27.78333,
    "lng": 74.93333
  },
  {
    "name": "Bhusaval, Maharashtra, India",
    "lat": 21.04365,
    "lng": 75.78506
  },
  {
    "name": "Biaora, Madhya Pradesh, India",
    "lat": 23.9205,
    "lng": 76.91074
  },
  {
    "name": "Bidar, Karnataka, India",
    "lat": 18.08333,
    "lng": 77.33333
  },
  {
    "name": "Bidhnu, Uttar Pradesh, India",
    "lat": 26.33333333,
    "lng": 80.28333333
  },
  {
    "name": "Bidhuna, Uttar Pradesh, India",
    "lat": 26.80172,
    "lng": 79.50829
  },
  {
    "name": "Bighapur Khurd, Uttar Pradesh, India",
    "lat": 26.34734,
    "lng": 80.65698
  },
  {
    "name": "Bighapur, Uttar Pradesh, India",
    "lat": 26.35,
    "lng": 80.68
  },
  {
    "name": "Bihar Sharif, Bihar, India",
    "lat": 25.20084,
    "lng": 85.52389
  },
  {
    "name": "Bihariganj, Bihar, India",
    "lat": 25.73415,
    "lng": 86.98837
  },
  {
    "name": "Bihpuriagaon, Assam, India",
    "lat": 27.01718,
    "lng": 93.91673
  },
  {
    "name": "Bijapur, Chhattisgarh, India",
    "lat": 18.84322,
    "lng": 80.7761
  },
  {
    "name": "Bijawar, Madhya Pradesh, India",
    "lat": 24.62351,
    "lng": 79.48994
  },
  {
    "name": "Bijbehara, Jammu and Kashmir, India",
    "lat": 33.79378,
    "lng": 75.107
  },
  {
    "name": "Bijni, Assam, India",
    "lat": 26.49588,
    "lng": 90.70298
  },
  {
    "name": "Bijnor, Uttar Pradesh, India",
    "lat": 29.41667,
    "lng": 78.51667
  },
  {
    "name": "Bijrauni, Madhya Pradesh, India",
    "lat": 24.93296,
    "lng": 77.64352
  },
  {
    "name": "Bijur, Maharashtra, India",
    "lat": 13.84388889,
    "lng": 74.63972222
  },
  {
    "name": "Bikaner, Rajasthan, India",
    "lat": 28.01762,
    "lng": 73.31495
  },
  {
    "name": "Bikapur, Uttar Pradesh, India",
    "lat": 26.59534,
    "lng": 82.13272
  },
  {
    "name": "Bikramganj, Bihar, India",
    "lat": 25.21073,
    "lng": 84.25508
  },
  {
    "name": "Bilara, Rajasthan, India",
    "lat": 26.18067,
    "lng": 73.7055
  },
  {
    "name": "Bilari, Uttar Pradesh, India",
    "lat": 28.62146,
    "lng": 78.80361
  },
  {
    "name": "Bilariaganj, Uttar Pradesh, India",
    "lat": 26.19593,
    "lng": 83.2269
  },
  {
    "name": "Bilashi, Maharashtra, India",
    "lat": 16.98333,
    "lng": 74.03333
  },
  {
    "name": "Bilasipara, Assam, India",
    "lat": 26.23285,
    "lng": 90.2341
  },
  {
    "name": "Bilaspur, Chhattisgarh, India",
    "lat": 22.38333,
    "lng": 82.13333
  },
  {
    "name": "Bilaspur, Haryana, India",
    "lat": 30.3045,
    "lng": 77.30424
  },
  {
    "name": "Bilaspur, Himachal Pradesh, India",
    "lat": 31.33027,
    "lng": 76.75663
  },
  {
    "name": "Bilaspur, Uttar Pradesh, India",
    "lat": 28.88655,
    "lng": 79.2703
  },
  {
    "name": "Bilgi, Karnataka, India",
    "lat": 16.34714,
    "lng": 75.61804
  },
  {
    "name": "Bilgram, Uttar Pradesh, India",
    "lat": 27.17509,
    "lng": 80.03201
  },
  {
    "name": "Bilhaur, Uttar Pradesh, India",
    "lat": 26.84345,
    "lng": 80.06388
  },
  {
    "name": "Bilimora, Gujarat, India",
    "lat": 20.76957,
    "lng": 72.96134
  },
  {
    "name": "Bilkha, Gujarat, India",
    "lat": 21.4415,
    "lng": 70.60063
  },
  {
    "name": "Biloli, Maharashtra, India",
    "lat": 18.77385,
    "lng": 77.72463
  },
  {
    "name": "Bilsanda, Uttar Pradesh, India",
    "lat": 28.24341,
    "lng": 79.95135
  },
  {
    "name": "Bilsi, Uttar Pradesh, India",
    "lat": 28.12941,
    "lng": 78.9109
  },
  {
    "name": "Bilthra, Uttar Pradesh, India",
    "lat": 26.12705,
    "lng": 83.89148
  },
  {
    "name": "Binauli, Uttar Pradesh, India",
    "lat": 29.09416667,
    "lng": 77.40083333
  },
  {
    "name": "Binaur, Uttar Pradesh, India",
    "lat": 26.38333333,
    "lng": 80.16666667
  },
  {
    "name": "Bindki, Uttar Pradesh, India",
    "lat": 26.03613,
    "lng": 80.57617
  },
  {
    "name": "Binka, Odisha, India",
    "lat": 21.02626,
    "lng": 83.81197
  },
  {
    "name": "Birbhaddar, Uttarakhand, India",
    "lat": 30.0712,
    "lng": 78.28189
  },
  {
    "name": "Birbhum, West Bengal, India",
    "lat": 24,
    "lng": 87.58333
  },
  {
    "name": "Birdpur, Uttar Pradesh, India",
    "lat": 27.3833,
    "lng": 83.1167
  },
  {
    "name": "Birmingham, UK",
    "lat": 52.4862,
    "lng": -1.8904
  },
  {
    "name": "Birmitrapur, Odisha, India",
    "lat": 22.4,
    "lng": 84.76667
  },
  {
    "name": "Birpara, West Bengal, India",
    "lat": 26.5,
    "lng": 89.5
  },
  {
    "name": "Birpur, Bihar, India",
    "lat": 26.50823,
    "lng": 87.01194
  },
  {
    "name": "Birpur, Uttar Pradesh, India",
    "lat": 26.53,
    "lng": 86.25
  },
  {
    "name": "Birur, Karnataka, India",
    "lat": 13.59723,
    "lng": 75.97167
  },
  {
    "name": "Bisalpur, Uttar Pradesh, India",
    "lat": 28.29253,
    "lng": 79.80472
  },
  {
    "name": "Bisanda Buzurg, Uttar Pradesh, India",
    "lat": 25.41666667,
    "lng": 80.61666667
  },
  {
    "name": "Bisauli, Uttar Pradesh, India",
    "lat": 28.30772,
    "lng": 78.93678
  },
  {
    "name": "Bisenda Buzurg, Uttar Pradesh, India",
    "lat": 25.4035,
    "lng": 80.61889
  },
  {
    "name": "Bishnah, Jammu and Kashmir, India",
    "lat": 32.6106,
    "lng": 74.85557
  },
  {
    "name": "Bishnupur, Manipur, India",
    "lat": 24.60769,
    "lng": 93.77998
  },
  {
    "name": "Bishnupur, West Bengal, India",
    "lat": 22.38,
    "lng": 88.27
  },
  {
    "name": "Bishunpur Urf Maharajganj, Uttar Pradesh, India",
    "lat": 26.25914,
    "lng": 83.11643
  },
  {
    "name": "Bissau, Rajasthan, India",
    "lat": 28.24737,
    "lng": 75.07666
  },
  {
    "name": "Biswan, Uttar Pradesh, India",
    "lat": 27.49581,
    "lng": 80.99618
  },
  {
    "name": "Bithur, Uttar Pradesh, India",
    "lat": 26.60664,
    "lng": 80.27098
  },
  {
    "name": "Bobbili, Andhra Pradesh, India",
    "lat": 18.57366,
    "lng": 83.35925
  },
  {
    "name": "Bodh Gaya, Bihar, India",
    "lat": 24.69808,
    "lng": 84.9869
  },
  {
    "name": "Bodhan, Telangana, India",
    "lat": 18.66208,
    "lng": 77.88581
  },
  {
    "name": "Bodinayakkanur, Tamil Nadu, India",
    "lat": 10.01171,
    "lng": 77.34976
  },
  {
    "name": "Bodri, Madhya Pradesh, India",
    "lat": 23.16524,
    "lng": 81.43262
  },
  {
    "name": "Boisar, Maharashtra, India",
    "lat": 19.80362,
    "lng": 72.75598
  },
  {
    "name": "Bokajan, Assam, India",
    "lat": 26.02131,
    "lng": 93.77945
  },
  {
    "name": "Bokakhat, Assam, India",
    "lat": 26.64018,
    "lng": 93.60052
  },
  {
    "name": "Bokaro, Jharkhand, India",
    "lat": 23.68562,
    "lng": 85.99026
  },
  {
    "name": "Bolanikhodan, Odisha, India",
    "lat": 22.11312,
    "lng": 85.33645
  },
  {
    "name": "Bolpur, West Bengal, India",
    "lat": 23.67,
    "lng": 87.72
  },
  {
    "name": "Bomdila, Arunachal Pradesh, India",
    "lat": 27.26475,
    "lng": 92.42472
  },
  {
    "name": "Bongaigaon, Assam, India",
    "lat": 26.4603,
    "lng": 90.6464
  },
  {
    "name": "Borgaon Manju, Maharashtra, India",
    "lat": 20.71944444,
    "lng": 77.15277778
  },
  {
    "name": "Borivali, Maharashtra, India",
    "lat": 19.23,
    "lng": 72.86
  },
  {
    "name": "Borkhera, Rajasthan, India",
    "lat": 25.52115,
    "lng": 75.64028
  },
  {
    "name": "Borsad, Gujarat, India",
    "lat": 22.40788,
    "lng": 72.89817
  },
  {
    "name": "Boston, MA, USA",
    "lat": 42.3601,
    "lng": -71.0589
  },
  {
    "name": "Botad, Gujarat, India",
    "lat": 22.16917,
    "lng": 71.66671
  },
  {
    "name": "Brahmapur, Odisha, India",
    "lat": 19.31151,
    "lng": 84.7929
  },
  {
    "name": "Brahmapuri, Maharashtra, India",
    "lat": 20.6084,
    "lng": 79.8559
  },
  {
    "name": "Brajarajnagar, Odisha, India",
    "lat": 21.81667,
    "lng": 83.91667
  },
  {
    "name": "Breach Candy, Maharashtra, India",
    "lat": 18.967,
    "lng": 72.805
  },
  {
    "name": "Brisbane, QLD, Australia",
    "lat": -27.4698,
    "lng": 153.0251
  },
  {
    "name": "Budaun, Uttar Pradesh, India",
    "lat": 28.11667,
    "lng": 78.98333
  },
  {
    "name": "Budge Budge, West Bengal, India",
    "lat": 22.47,
    "lng": 88.17
  },
  {
    "name": "Budhana, Uttar Pradesh, India",
    "lat": 29.28805,
    "lng": 77.47534
  },
  {
    "name": "Budhlada, Punjab, India",
    "lat": 29.92799,
    "lng": 75.56205
  },
  {
    "name": "Buguda, Odisha, India",
    "lat": 19.80806,
    "lng": 84.79084
  },
  {
    "name": "Bulandshahr, Uttar Pradesh, India",
    "lat": 28.41667,
    "lng": 77.83333
  },
  {
    "name": "Buldana, Maharashtra, India",
    "lat": 20.58333,
    "lng": 76.41667
  },
  {
    "name": "Bundi, Rajasthan, India",
    "lat": 25.43855,
    "lng": 75.63735
  },
  {
    "name": "Bundu, Jharkhand, India",
    "lat": 23.16095,
    "lng": 85.59007
  },
  {
    "name": "Burhanpur, Madhya Pradesh, India",
    "lat": 21.31,
    "lng": 76.23
  },
  {
    "name": "Burhar, Madhya Pradesh, India",
    "lat": 23.21494,
    "lng": 81.53204
  },
  {
    "name": "Buriya, Haryana, India",
    "lat": 30.15911,
    "lng": 77.35814
  },
  {
    "name": "Burla, Odisha, India",
    "lat": 21.50976,
    "lng": 83.87259
  },
  {
    "name": "Buxar, Bihar, India",
    "lat": 25.5,
    "lng": 84.1
  },
  {
    "name": "Byadgi, Karnataka, India",
    "lat": 14.67325,
    "lng": 75.4868
  },
  {
    "name": "Byculla, Maharashtra, India",
    "lat": 18.98,
    "lng": 72.835
  },
  {
    "name": "Byndoor, Karnataka, India",
    "lat": 13.86667,
    "lng": 74.63333
  },
  {
    "name": "Cachar, Assam, India",
    "lat": 24.78213,
    "lng": 92.85771
  },
  {
    "name": "Cairo, Egypt",
    "lat": 30.0444,
    "lng": 31.2357
  },
  {
    "name": "Calangute, Goa, India",
    "lat": 15.5439,
    "lng": 73.7553
  },
  {
    "name": "Canacona, Karnataka, India",
    "lat": 14.9959,
    "lng": 74.05056
  },
  {
    "name": "Candolim, Goa, India",
    "lat": 15.51807,
    "lng": 73.76259
  },
  {
    "name": "Canning, West Bengal, India",
    "lat": 22.32,
    "lng": 88.67
  },
  {
    "name": "Cape Town, South Africa",
    "lat": -33.9249,
    "lng": 18.4241
  },
  {
    "name": "Captainganj, Uttar Pradesh, India",
    "lat": 26.9264,
    "lng": 83.71334
  },
  {
    "name": "Carapur, Goa, India",
    "lat": 15.56588,
    "lng": 73.98713
  },
  {
    "name": "Cavelossim, Goa, India",
    "lat": 15.17255,
    "lng": 73.94194
  },
  {
    "name": "Central Delhi, Delhi, India",
    "lat": 28.64857,
    "lng": 77.21895
  },
  {
    "name": "Chabua, Assam, India",
    "lat": 27.48253,
    "lng": 95.17451
  },
  {
    "name": "Chaibasa, Jharkhand, India",
    "lat": 22.55038,
    "lng": 85.80249
  },
  {
    "name": "Chail, Uttar Pradesh, India",
    "lat": 25.42654,
    "lng": 81.63198
  },
  {
    "name": "Chakan, Maharashtra, India",
    "lat": 18.76059,
    "lng": 73.86351
  },
  {
    "name": "Chakapara, West Bengal, India",
    "lat": 22.63,
    "lng": 88.35
  },
  {
    "name": "Chakdaha, West Bengal, India",
    "lat": 23.08,
    "lng": 88.52
  },
  {
    "name": "Chakia, Bihar, India",
    "lat": 26.41598,
    "lng": 85.04665
  },
  {
    "name": "Chakia, Uttar Pradesh, India",
    "lat": 25.04891,
    "lng": 83.22155
  },
  {
    "name": "Chaklasi, Gujarat, India",
    "lat": 22.6532,
    "lng": 72.94497
  },
  {
    "name": "Chakradharpur, Jharkhand, India",
    "lat": 22.67611,
    "lng": 85.62892
  },
  {
    "name": "Chakrata, Uttarakhand, India",
    "lat": 30.70369,
    "lng": 77.86386
  },
  {
    "name": "Chaksu, Rajasthan, India",
    "lat": 26.6051,
    "lng": 75.94814
  },
  {
    "name": "Chakulia, Jharkhand, India",
    "lat": 22.48301,
    "lng": 86.71793
  },
  {
    "name": "Chakur, Maharashtra, India",
    "lat": 18.51305556,
    "lng": 76.87527778
  },
  {
    "name": "Chalala, Gujarat, India",
    "lat": 21.41073,
    "lng": 71.16621
  },
  {
    "name": "Chalisgaon, Maharashtra, India",
    "lat": 20.45781,
    "lng": 75.01596
  },
  {
    "name": "Challakere, Karnataka, India",
    "lat": 14.318,
    "lng": 76.65165
  },
  {
    "name": "Challapalle, Andhra Pradesh, India",
    "lat": 16.11756,
    "lng": 80.93139
  },
  {
    "name": "Chaloda, Gujarat, India",
    "lat": 22.8,
    "lng": 72.45
  },
  {
    "name": "Chamba, Himachal Pradesh, India",
    "lat": 32.57147,
    "lng": 76.10229
  },
  {
    "name": "Chamoli, Uttarakhand, India",
    "lat": 30.5,
    "lng": 79.5
  },
  {
    "name": "Champa, Chhattisgarh, India",
    "lat": 22.03532,
    "lng": 82.64234
  },
  {
    "name": "Champadanga, West Bengal, India",
    "lat": 22.83,
    "lng": 87.96
  },
  {
    "name": "Champahati, West Bengal, India",
    "lat": 22.40026,
    "lng": 88.49209
  },
  {
    "name": "Champaner, Gujarat, India",
    "lat": 22.4859,
    "lng": 73.5371
  },
  {
    "name": "Champawat, Uttarakhand, India",
    "lat": 29.28756,
    "lng": 80.03737
  },
  {
    "name": "Champdani, West Bengal, India",
    "lat": 22.8,
    "lng": 88.37
  },
  {
    "name": "Champhai, Mizoram, India",
    "lat": 23.47444,
    "lng": 93.32556
  },
  {
    "name": "Champua, Odisha, India",
    "lat": 22.06734,
    "lng": 85.66463
  },
  {
    "name": "Chamrajnagar, Karnataka, India",
    "lat": 11.96,
    "lng": 77.09
  },
  {
    "name": "Chanasma, Gujarat, India",
    "lat": 23.71472,
    "lng": 72.11279
  },
  {
    "name": "Chanda, Maharashtra, India",
    "lat": 19.95076,
    "lng": 79.29523
  },
  {
    "name": "Chandannagar, West Bengal, India",
    "lat": 22.86666667,
    "lng": 88.38333333
  },
  {
    "name": "Chandauli District, Uttar Pradesh, India",
    "lat": 25.26134,
    "lng": 83.26408
  },
  {
    "name": "Chandauli, Uttar Pradesh, India",
    "lat": 25.25803,
    "lng": 83.26825
  },
  {
    "name": "Chandausi, Uttar Pradesh, India",
    "lat": 28.45,
    "lng": 78.77
  },
  {
    "name": "Chandbali, Odisha, India",
    "lat": 20.77519,
    "lng": 86.74139
  },
  {
    "name": "Chandel, Manipur, India",
    "lat": 24.5739,
    "lng": 94.2913
  },
  {
    "name": "Chanderi, Madhya Pradesh, India",
    "lat": 24.71312,
    "lng": 78.13809
  },
  {
    "name": "Chandgad, Maharashtra, India",
    "lat": 15,
    "lng": 74
  },
  {
    "name": "Chandia, Madhya Pradesh, India",
    "lat": 23.65647,
    "lng": 80.70911
  },
  {
    "name": "Chandigarh, Chandigarh, India",
    "lat": 30.73629,
    "lng": 76.7884
  },
  {
    "name": "Chandil, Jharkhand, India",
    "lat": 22.95745,
    "lng": 86.05331
  },
  {
    "name": "Chandla, Madhya Pradesh, India",
    "lat": 25.07148,
    "lng": 80.19294
  },
  {
    "name": "Chandor, Maharashtra, India",
    "lat": 20.3306,
    "lng": 74.24467
  },
  {
    "name": "Chandpur, Uttar Pradesh, India",
    "lat": 29.13489,
    "lng": 78.27187
  },
  {
    "name": "Chandrakona, West Bengal, India",
    "lat": 22.73,
    "lng": 87.52
  },
  {
    "name": "Chandrapur, Maharashtra, India",
    "lat": 20.11793,
    "lng": 79.44377
  },
  {
    "name": "Chanduasi, Uttar Pradesh, India",
    "lat": 28.45178,
    "lng": 78.78277
  },
  {
    "name": "Chandur Bazar, Maharashtra, India",
    "lat": 21.23853,
    "lng": 77.74713
  },
  {
    "name": "Chandur, Maharashtra, India",
    "lat": 19.73444,
    "lng": 79.17167
  },
  {
    "name": "Chandur, Telangana, India",
    "lat": 17.87455,
    "lng": 78.10017
  },
  {
    "name": "Changanacheri, Kerala, India",
    "lat": 9.44203,
    "lng": 76.53604
  },
  {
    "name": "Changlang, Arunachal Pradesh, India",
    "lat": 27.36265,
    "lng": 96.34518
  },
  {
    "name": "Channagiri, Karnataka, India",
    "lat": 14.02399,
    "lng": 75.92577
  },
  {
    "name": "Channapatna, Karnataka, India",
    "lat": 12.65143,
    "lng": 77.20672
  },
  {
    "name": "Channarayapatna, Karnataka, India",
    "lat": 12.90642,
    "lng": 76.38775
  },
  {
    "name": "Chapar, Assam, India",
    "lat": 26.27266,
    "lng": 90.44556
  },
  {
    "name": "Chapra, Bihar, India",
    "lat": 25.78031,
    "lng": 84.74709
  },
  {
    "name": "Charkhari, Uttar Pradesh, India",
    "lat": 25.40304,
    "lng": 79.74877
  },
  {
    "name": "Charkhi Dadri, Haryana, India",
    "lat": 28.59166,
    "lng": 76.27161
  },
  {
    "name": "Charthawal, Uttar Pradesh, India",
    "lat": 29.54687,
    "lng": 77.59438
  },
  {
    "name": "Chas, Jharkhand, India",
    "lat": 23.63556,
    "lng": 86.16712
  },
  {
    "name": "Chatakonda, Telangana, India",
    "lat": 17.55303,
    "lng": 80.6477
  },
  {
    "name": "Chatra, Jharkhand, India",
    "lat": 24.20645,
    "lng": 84.87085
  },
  {
    "name": "Chatrapur, Odisha, India",
    "lat": 19.35574,
    "lng": 84.98359
  },
  {
    "name": "Chaupal, Himachal Pradesh, India",
    "lat": 30.94647,
    "lng": 77.5884
  },
  {
    "name": "Chausala, Maharashtra, India",
    "lat": 18.708692,
    "lng": 75.691595
  },
  {
    "name": "Chechat, Rajasthan, India",
    "lat": 24.76667,
    "lng": 75.88333
  },
  {
    "name": "Chelakara, Kerala, India",
    "lat": 10.69289,
    "lng": 76.34387
  },
  {
    "name": "Chembur, Maharashtra, India",
    "lat": 19.05871111,
    "lng": 72.89969444
  },
  {
    "name": "Chemmumiahpet, Andhra Pradesh, India",
    "lat": 15.89794,
    "lng": 79.32129
  },
  {
    "name": "Chengam, Tamil Nadu, India",
    "lat": 12.30889,
    "lng": 78.79137
  },
  {
    "name": "Chengannur, Kerala, India",
    "lat": 9.31575,
    "lng": 76.61513
  },
  {
    "name": "Chennai, Tamil Nadu, India",
    "lat": 13.08784,
    "lng": 80.27847
  },
  {
    "name": "Chennimalai, Tamil Nadu, India",
    "lat": 11.16378,
    "lng": 77.60388
  },
  {
    "name": "Cherpulassery, Kerala, India",
    "lat": 10.87655,
    "lng": 76.30932
  },
  {
    "name": "Cherrapunji, Meghalaya, India",
    "lat": 25.30089,
    "lng": 91.69619
  },
  {
    "name": "Cherthala, Kerala, India",
    "lat": 9.68444,
    "lng": 76.33558
  },
  {
    "name": "Chetput, Tamil Nadu, India",
    "lat": 13.07,
    "lng": 80.24083
  },
  {
    "name": "Chettipalaiyam, Tamil Nadu, India",
    "lat": 10.91248,
    "lng": 77.03699
  },
  {
    "name": "Chetwayi, Kerala, India",
    "lat": 10.52885,
    "lng": 76.04793
  },
  {
    "name": "Cheyyar, Tamil Nadu, India",
    "lat": 12.66052,
    "lng": 79.54308
  },
  {
    "name": "Cheyyur, Tamil Nadu, India",
    "lat": 12.34948,
    "lng": 80.00304
  },
  {
    "name": "Chhabra, Rajasthan, India",
    "lat": 24.66472,
    "lng": 76.84379
  },
  {
    "name": "Chhachhrauli, Haryana, India",
    "lat": 30.24492,
    "lng": 77.36027
  },
  {
    "name": "Chhala, Gujarat, India",
    "lat": 23.30779,
    "lng": 72.77404
  },
  {
    "name": "Chhapar, Rajasthan, India",
    "lat": 27.819,
    "lng": 74.43936
  },
  {
    "name": "Chhaprauli, Uttar Pradesh, India",
    "lat": 29.20989,
    "lng": 77.17454
  },
  {
    "name": "Chharra, Uttar Pradesh, India",
    "lat": 27.9247,
    "lng": 78.40102
  },
  {
    "name": "Chhata, Uttar Pradesh, India",
    "lat": 27.72374,
    "lng": 77.5081
  },
  {
    "name": "Chhatapur, Bihar, India",
    "lat": 26.21965,
    "lng": 87.00479
  },
  {
    "name": "Chhatarpur, Madhya Pradesh, India",
    "lat": 24.75,
    "lng": 79.75
  },
  {
    "name": "Chhibramau, Uttar Pradesh, India",
    "lat": 27.14872,
    "lng": 79.50078
  },
  {
    "name": "Chhindwara, Madhya Pradesh, India",
    "lat": 22.05697,
    "lng": 78.93958
  },
  {
    "name": "Chhitauni, Uttar Pradesh, India",
    "lat": 27.11666667,
    "lng": 83.98333333
  },
  {
    "name": "Chhota Udepur, Gujarat, India",
    "lat": 22.30401,
    "lng": 74.0158
  },
  {
    "name": "Chhoti Sadri, Rajasthan, India",
    "lat": 24.38145,
    "lng": 74.7012
  },
  {
    "name": "Chhuikhadan, Chhattisgarh, India",
    "lat": 21.52316,
    "lng": 80.99788
  },
  {
    "name": "Chhutmalpur, Uttar Pradesh, India",
    "lat": 30.03209,
    "lng": 77.75329
  },
  {
    "name": "Chicago, IL, USA",
    "lat": 41.8781,
    "lng": -87.6298
  },
  {
    "name": "Chicalim, Goa, India",
    "lat": 15.39835,
    "lng": 73.84216
  },
  {
    "name": "Chichli, Madhya Pradesh, India",
    "lat": 22.83363,
    "lng": 78.82611
  },
  {
    "name": "Chicholi, Maharashtra, India",
    "lat": 21.46926,
    "lng": 79.70151
  },
  {
    "name": "Chichondi Patil, Maharashtra, India",
    "lat": 19,
    "lng": 74.91666667
  },
  {
    "name": "Chidambaram, Tamil Nadu, India",
    "lat": 11.39933,
    "lng": 79.69144
  },
  {
    "name": "Chidawa, Rajasthan, India",
    "lat": 28.23937,
    "lng": 75.64035
  },
  {
    "name": "Chik Ballapur, Karnataka, India",
    "lat": 13.43512,
    "lng": 77.72787
  },
  {
    "name": "Chikhli (Buldhana), Maharashtra, India",
    "lat": 20.35046,
    "lng": 76.25774
  },
  {
    "name": "Chikhli (Jalna), Maharashtra, India",
    "lat": 20.02193,
    "lng": 75.78544
  },
  {
    "name": "Chikhli, Gujarat, India",
    "lat": 20.75751,
    "lng": 73.06268
  },
  {
    "name": "Chikitigarh, Odisha, India",
    "lat": 19.20233,
    "lng": 84.6145
  },
  {
    "name": "Chikkaballapur, Karnataka, India",
    "lat": 13.55,
    "lng": 77.87
  },
  {
    "name": "Chikkamagaluru, Karnataka, India",
    "lat": 13.49,
    "lng": 75.73
  },
  {
    "name": "Chiknayakanhalli, Karnataka, India",
    "lat": 13.41609,
    "lng": 76.62063
  },
  {
    "name": "Chikodi, Karnataka, India",
    "lat": 16.42898,
    "lng": 74.58591
  },
  {
    "name": "Chilakalurupet, Andhra Pradesh, India",
    "lat": 16.08987,
    "lng": 80.16705
  },
  {
    "name": "Chillupar, Uttar Pradesh, India",
    "lat": 26.28221,
    "lng": 83.5064
  },
  {
    "name": "Chima, Punjab, India",
    "lat": 30.6854,
    "lng": 76.08643
  },
  {
    "name": "Chimur, Maharashtra, India",
    "lat": 20.49694444,
    "lng": 79.37666667
  },
  {
    "name": "Chinchani, Maharashtra, India",
    "lat": 19.87458,
    "lng": 72.6851
  },
  {
    "name": "Chinchinim, Goa, India",
    "lat": 15.21447,
    "lng": 73.97555
  },
  {
    "name": "Chincholi, Karnataka, India",
    "lat": 17.46508,
    "lng": 77.41874
  },
  {
    "name": "Chinchpokli, Maharashtra, India",
    "lat": 18.98333333,
    "lng": 72.83333333
  },
  {
    "name": "Chingleput, Tamil Nadu, India",
    "lat": 12.69184,
    "lng": 79.97661
  },
  {
    "name": "Chinna Salem, Tamil Nadu, India",
    "lat": 11.63422,
    "lng": 78.87412
  },
  {
    "name": "Chinnachowk, Andhra Pradesh, India",
    "lat": 14.47516,
    "lng": 78.8354
  },
  {
    "name": "Chinnamanur, Tamil Nadu, India",
    "lat": 9.83999,
    "lng": 77.38109
  },
  {
    "name": "Chinnasekkadu, Tamil Nadu, India",
    "lat": 13.16089,
    "lng": 80.25727
  },
  {
    "name": "Chintamani, Karnataka, India",
    "lat": 13.40051,
    "lng": 78.05172
  },
  {
    "name": "Chiplun, Maharashtra, India",
    "lat": 17.53339,
    "lng": 73.50935
  },
  {
    "name": "Chipurupalle, Andhra Pradesh, India",
    "lat": 18.31142,
    "lng": 83.56846
  },
  {
    "name": "Chirala, Andhra Pradesh, India",
    "lat": 15.82385,
    "lng": 80.35219
  },
  {
    "name": "Chirang, Assam, India",
    "lat": 26.52527,
    "lng": 90.49066
  },
  {
    "name": "Chirgaon, Uttar Pradesh, India",
    "lat": 25.57198,
    "lng": 78.81432
  },
  {
    "name": "Chiria, Jharkhand, India",
    "lat": 22.31093,
    "lng": 85.27601
  },
  {
    "name": "Chitapur, Karnataka, India",
    "lat": 17.12357,
    "lng": 77.0824
  },
  {
    "name": "Chitradurga, Karnataka, India",
    "lat": 14.2,
    "lng": 76.5
  },
  {
    "name": "Chitrakoot Dham, Uttar Pradesh, India",
    "lat": 25.2,
    "lng": 80.9
  },
  {
    "name": "Chitrakoot, Uttar Pradesh, India",
    "lat": 25.20511,
    "lng": 81.08962
  },
  {
    "name": "Chittaranjan, West Bengal, India",
    "lat": 23.87,
    "lng": 86.87
  },
  {
    "name": "Chittarkonda, Odisha, India",
    "lat": 18.12533,
    "lng": 82.1089
  },
  {
    "name": "Chittaurgarh, Rajasthan, India",
    "lat": 24.5,
    "lng": 74.5
  },
  {
    "name": "Chittoor, Andhra Pradesh, India",
    "lat": 13.41667,
    "lng": 79
  },
  {
    "name": "Chittur, Kerala, India",
    "lat": 10.69967,
    "lng": 76.7471
  },
  {
    "name": "Chodavaram, Andhra Pradesh, India",
    "lat": 17.82884,
    "lng": 82.93526
  },
  {
    "name": "Cholapuram, Tamil Nadu, India",
    "lat": 9.35193,
    "lng": 77.56839
  },
  {
    "name": "Chopan, Uttar Pradesh, India",
    "lat": 24.51954,
    "lng": 83.02287
  },
  {
    "name": "Chopda, Maharashtra, India",
    "lat": 21.24578,
    "lng": 75.29946
  },
  {
    "name": "Chorhat, Madhya Pradesh, India",
    "lat": 24.42743,
    "lng": 81.66948
  },
  {
    "name": "Chotila, Gujarat, India",
    "lat": 22.42347,
    "lng": 71.19641
  },
  {
    "name": "Chowari, Himachal Pradesh, India",
    "lat": 32.4319,
    "lng": 76.012
  },
  {
    "name": "Chuari Khas, Himachal Pradesh, India",
    "lat": 32.43058,
    "lng": 76.01428
  },
  {
    "name": "Chuda, Gujarat, India",
    "lat": 22.48333333,
    "lng": 71.68333333
  },
  {
    "name": "Chunar, Uttar Pradesh, India",
    "lat": 25.12776,
    "lng": 82.8821
  },
  {
    "name": "Churachandpur, Manipur, India",
    "lat": 24.33333,
    "lng": 93.68333
  },
  {
    "name": "Churk, Uttar Pradesh, India",
    "lat": 24.65,
    "lng": 83.1
  },
  {
    "name": "Churu, Rajasthan, India",
    "lat": 28.30415,
    "lng": 74.96718
  },
  {
    "name": "Churulia, West Bengal, India",
    "lat": 23.78,
    "lng": 87.08
  },
  {
    "name": "Clement Town, Uttarakhand, India",
    "lat": 30.26361,
    "lng": 78.00862
  },
  {
    "name": "Closepet, Karnataka, India",
    "lat": 12.72181,
    "lng": 77.28149
  },
  {
    "name": "Cochin, Kerala, India",
    "lat": 9.93988,
    "lng": 76.26022
  },
  {
    "name": "Coimbatore, Tamil Nadu, India",
    "lat": 10.8,
    "lng": 77.09
  },
  {
    "name": "Colaba, Maharashtra, India",
    "lat": 18.91,
    "lng": 72.81
  },
  {
    "name": "Colachel, Tamil Nadu, India",
    "lat": 8.17938,
    "lng": 77.25818
  },
  {
    "name": "Colgong, Bihar, India",
    "lat": 25.26328,
    "lng": 87.23264
  },
  {
    "name": "Colombo, Sri Lanka",
    "lat": 6.9271,
    "lng": 79.8612
  },
  {
    "name": "Colonelganj, Uttar Pradesh, India",
    "lat": 27.13432,
    "lng": 81.69868
  },
  {
    "name": "Colovale, Goa, India",
    "lat": 15.63522,
    "lng": 73.82426
  },
  {
    "name": "Colva, Goa, India",
    "lat": 15.27976,
    "lng": 73.92285
  },
  {
    "name": "Contai, West Bengal, India",
    "lat": 21.78,
    "lng": 87.75
  },
  {
    "name": "Cooch Behar, West Bengal, India",
    "lat": 26.31666667,
    "lng": 89.43333333
  },
  {
    "name": "Coondapoor, Karnataka, India",
    "lat": 13.63126,
    "lng": 74.6902
  },
  {
    "name": "Cortalim, Goa, India",
    "lat": 15.40247,
    "lng": 73.90881
  },
  {
    "name": "Cossimbazar, West Bengal, India",
    "lat": 24.12,
    "lng": 88.28
  },
  {
    "name": "Cuddalore, Tamil Nadu, India",
    "lat": 11.52,
    "lng": 79.51
  },
  {
    "name": "Cuddapah, Andhra Pradesh, India",
    "lat": 14.41667,
    "lng": 78.75
  },
  {
    "name": "Cumbum, Andhra Pradesh, India",
    "lat": 15.58171,
    "lng": 79.11059
  },
  {
    "name": "Cumbum, Tamil Nadu, India",
    "lat": 9.73647,
    "lng": 77.2847
  },
  {
    "name": "Cuncolim, Goa, India",
    "lat": 15.1773,
    "lng": 73.99392
  },
  {
    "name": "Curchorem, Goa, India",
    "lat": 15.26349,
    "lng": 74.10875
  },
  {
    "name": "Curti, Goa, India",
    "lat": 15.41667,
    "lng": 74.01667
  },
  {
    "name": "Cuttack, Odisha, India",
    "lat": 20.5,
    "lng": 86.25
  },
  {
    "name": "Dabhoda, Gujarat, India",
    "lat": 23.16666667,
    "lng": 72.73333333
  },
  {
    "name": "Dabhoi, Gujarat, India",
    "lat": 22.18333,
    "lng": 73.43333
  },
  {
    "name": "Dabhol, Maharashtra, India",
    "lat": 17.58971,
    "lng": 73.18001
  },
  {
    "name": "Daboh, Madhya Pradesh, India",
    "lat": 26.00239,
    "lng": 78.87658
  },
  {
    "name": "Dabra, Madhya Pradesh, India",
    "lat": 25.88572,
    "lng": 78.33221
  },
  {
    "name": "Dabwali, Haryana, India",
    "lat": 29.94906,
    "lng": 74.73832
  },
  {
    "name": "Daddi, Maharashtra, India",
    "lat": 16.06666667,
    "lng": 74.43333333
  },
  {
    "name": "Dadra & Nagar Haveli, Dadra and Nagar Haveli and Daman and Diu, India",
    "lat": 20.20651,
    "lng": 73.00811
  },
  {
    "name": "Dadra, Dadra and Nagar Haveli and Daman and Diu, India",
    "lat": 20.32504,
    "lng": 72.96618
  },
  {
    "name": "Dadri, Uttar Pradesh, India",
    "lat": 28.55257,
    "lng": 77.55403
  },
  {
    "name": "Dagshai, Himachal Pradesh, India",
    "lat": 30.88431,
    "lng": 77.05228
  },
  {
    "name": "Dahanu, Maharashtra, India",
    "lat": 19.96778,
    "lng": 72.71263
  },
  {
    "name": "Dahegam, Gujarat, India",
    "lat": 23.16903,
    "lng": 72.82161
  },
  {
    "name": "Dahivel, Maharashtra, India",
    "lat": 21.06666667,
    "lng": 74.16666667
  },
  {
    "name": "Dahod, Gujarat, India",
    "lat": 22.52,
    "lng": 74.15
  },
  {
    "name": "Daitari, Odisha, India",
    "lat": 21.1,
    "lng": 85.75
  },
  {
    "name": "Dakor, Gujarat, India",
    "lat": 22.75268,
    "lng": 73.14967
  },
  {
    "name": "Dakshin Dinajpur, West Bengal, India",
    "lat": 25.22,
    "lng": 88.76
  },
  {
    "name": "Dakshina Kannada, Karnataka, India",
    "lat": 12.84,
    "lng": 75.29
  },
  {
    "name": "Dalhousie, Himachal Pradesh, India",
    "lat": 32.55219,
    "lng": 75.94663
  },
  {
    "name": "Dalkola, West Bengal, India",
    "lat": 25.87577,
    "lng": 87.84009
  },
  {
    "name": "Dalmau, Uttar Pradesh, India",
    "lat": 26.06477,
    "lng": 81.0298
  },
  {
    "name": "Dalsingh Sarai, Bihar, India",
    "lat": 25.66795,
    "lng": 85.83636
  },
  {
    "name": "Daltonganj, Jharkhand, India",
    "lat": 24.03971,
    "lng": 84.0658
  },
  {
    "name": "Dam Dam, West Bengal, India",
    "lat": 22.63333333,
    "lng": 88.42277778
  },
  {
    "name": "Daman, Dadra and Nagar Haveli and Daman and Diu, India",
    "lat": 20.41431,
    "lng": 72.83236
  },
  {
    "name": "Damnagar, Gujarat, India",
    "lat": 21.69232,
    "lng": 71.51747
  },
  {
    "name": "Damoh, Madhya Pradesh, India",
    "lat": 23.75,
    "lng": 79.58333
  },
  {
    "name": "Dandeli, Karnataka, India",
    "lat": 15.26667,
    "lng": 74.61667
  },
  {
    "name": "Dandi, Gujarat, India",
    "lat": 21.32988,
    "lng": 72.62484
  },
  {
    "name": "Dankaur, Uttar Pradesh, India",
    "lat": 28.35121,
    "lng": 77.55508
  },
  {
    "name": "Danta, Gujarat, India",
    "lat": 24.18861111,
    "lng": 72.76583333
  },
  {
    "name": "Dantewada, Chhattisgarh, India",
    "lat": 18.899848,
    "lng": 81.3386752
  },
  {
    "name": "Dapoli, Maharashtra, India",
    "lat": 17.75888889,
    "lng": 73.18555556
  },
  {
    "name": "Daraganj, Uttar Pradesh, India",
    "lat": 25.43333333,
    "lng": 81.88333333
  },
  {
    "name": "Daranagar, Uttar Pradesh, India",
    "lat": 25.6816208,
    "lng": 81.3497579
  },
  {
    "name": "Darbhanga, Bihar, India",
    "lat": 26,
    "lng": 86
  },
  {
    "name": "Dariba, Rajasthan, India",
    "lat": 24.94865,
    "lng": 74.1342
  },
  {
    "name": "Darjeeling, West Bengal, India",
    "lat": 27.04166667,
    "lng": 88.26305556
  },
  {
    "name": "Darlawn, Mizoram, India",
    "lat": 24.01336,
    "lng": 92.92439
  },
  {
    "name": "Darrang, Assam, India",
    "lat": 26.51195,
    "lng": 92.16843
  },
  {
    "name": "Darsi, Andhra Pradesh, India",
    "lat": 15.76978,
    "lng": 79.67939
  },
  {
    "name": "Darwha, Maharashtra, India",
    "lat": 20.31017,
    "lng": 77.77257
  },
  {
    "name": "Daryapur, Maharashtra, India",
    "lat": 20.92489,
    "lng": 77.32644
  },
  {
    "name": "Dasna, Uttar Pradesh, India",
    "lat": 28.67736,
    "lng": 77.52252
  },
  {
    "name": "Dasnapur, Telangana, India",
    "lat": 19.65399,
    "lng": 78.51213
  },
  {
    "name": "Dasuya, Punjab, India",
    "lat": 31.81679,
    "lng": 75.6531
  },
  {
    "name": "Dataganj, Uttar Pradesh, India",
    "lat": 28.0253,
    "lng": 79.40819
  },
  {
    "name": "Datia, Madhya Pradesh, India",
    "lat": 25.75,
    "lng": 78.5
  },
  {
    "name": "Dattapur, Maharashtra, India",
    "lat": 20.78075,
    "lng": 78.1407
  },
  {
    "name": "Daudnagar, Bihar, India",
    "lat": 25.03473,
    "lng": 84.40095
  },
  {
    "name": "Daulatabad, Maharashtra, India",
    "lat": 19.93611,
    "lng": 75.22148
  },
  {
    "name": "Daulatpur, Himachal Pradesh, India",
    "lat": 31.78871,
    "lng": 75.99154
  },
  {
    "name": "Daulatpur, West Bengal, India",
    "lat": 25.32605,
    "lng": 88.32989
  },
  {
    "name": "Daund, Maharashtra, India",
    "lat": 18.46515,
    "lng": 74.58375
  },
  {
    "name": "Daurala, Uttar Pradesh, India",
    "lat": 29.11344,
    "lng": 77.70467
  },
  {
    "name": "Dausa, Rajasthan, India",
    "lat": 26.88269,
    "lng": 76.57053
  },
  {
    "name": "Davanagere, Karnataka, India",
    "lat": 14.43,
    "lng": 75.9
  },
  {
    "name": "Davorlim, Goa, India",
    "lat": 15.27221,
    "lng": 73.99242
  },
  {
    "name": "Dayal Bagh, Uttar Pradesh, India",
    "lat": 27.22122,
    "lng": 78.01095
  },
  {
    "name": "Dayapar, Gujarat, India",
    "lat": 23.63371,
    "lng": 68.90192
  },
  {
    "name": "Debagram, West Bengal, India",
    "lat": 23.68333333,
    "lng": 88.28333333
  },
  {
    "name": "Debipur, West Bengal, India",
    "lat": 24.25029,
    "lng": 88.61824
  },
  {
    "name": "Deccan Gymkhana, Maharashtra, India",
    "lat": 18.5184,
    "lng": 73.8406
  },
  {
    "name": "Deglur, Maharashtra, India",
    "lat": 18.54777778,
    "lng": 77.57722222
  },
  {
    "name": "Dehradun, Uttarakhand, India",
    "lat": 30.33,
    "lng": 78.06
  },
  {
    "name": "Dehri, Bihar, India",
    "lat": 24.90247,
    "lng": 84.18217
  },
  {
    "name": "Dehu, Maharashtra, India",
    "lat": 18.71851,
    "lng": 73.76635
  },
  {
    "name": "Delhi, Delhi, India",
    "lat": 28.65195,
    "lng": 77.23149
  },
  {
    "name": "Delvada, Gujarat, India",
    "lat": 20.77544,
    "lng": 71.04646
  },
  {
    "name": "Delwada, Gujarat, India",
    "lat": 20.7833,
    "lng": 71.05
  },
  {
    "name": "Denkanikota, Tamil Nadu, India",
    "lat": 12.5301,
    "lng": 77.78887
  },
  {
    "name": "Deoband, Uttar Pradesh, India",
    "lat": 29.69505,
    "lng": 77.67964
  },
  {
    "name": "Deogarh, Jharkhand, India",
    "lat": 24.44382,
    "lng": 86.72607
  },
  {
    "name": "Deogarh, Odisha, India",
    "lat": 21.53827,
    "lng": 84.73337
  },
  {
    "name": "Deogarh, Uttar Pradesh, India",
    "lat": 24.526,
    "lng": 78.238
  },
  {
    "name": "Deolali, Maharashtra, India",
    "lat": 19.94404,
    "lng": 73.83441
  },
  {
    "name": "Deolapar, Maharashtra, India",
    "lat": 21.58611111,
    "lng": 79.36944444
  },
  {
    "name": "Deoli, Delhi, India",
    "lat": 28.50254,
    "lng": 77.23117
  },
  {
    "name": "Deoli, Maharashtra, India",
    "lat": 20.6492,
    "lng": 78.48023
  },
  {
    "name": "Deoli, Rajasthan, India",
    "lat": 25.75728,
    "lng": 75.37991
  },
  {
    "name": "Deoni, Maharashtra, India",
    "lat": 18.26388889,
    "lng": 77.08222222
  },
  {
    "name": "Deoranian, Uttar Pradesh, India",
    "lat": 28.62989,
    "lng": 79.47648
  },
  {
    "name": "Deori Khas, Madhya Pradesh, India",
    "lat": 23.39017,
    "lng": 79.0163
  },
  {
    "name": "Deori, Chhattisgarh, India",
    "lat": 21.45,
    "lng": 82.61667
  },
  {
    "name": "Deoria, Uttar Pradesh, India",
    "lat": 26.66667,
    "lng": 83.75
  },
  {
    "name": "Depalpur, Madhya Pradesh, India",
    "lat": 22.85095,
    "lng": 75.54224
  },
  {
    "name": "Dera Baba Nanak, Punjab, India",
    "lat": 32.03733,
    "lng": 75.02787
  },
  {
    "name": "Dera Bassi, Punjab, India",
    "lat": 30.5872,
    "lng": 76.8428
  },
  {
    "name": "Dera Gopipur, Himachal Pradesh, India",
    "lat": 31.87919,
    "lng": 76.21871
  },
  {
    "name": "Derapur, Uttar Pradesh, India",
    "lat": 26.41666667,
    "lng": 79.8
  },
  {
    "name": "Dergaon, Assam, India",
    "lat": 26.7,
    "lng": 93.96667
  },
  {
    "name": "Deshnoke, Rajasthan, India",
    "lat": 27.79836,
    "lng": 73.34297
  },
  {
    "name": "Desur, Tamil Nadu, India",
    "lat": 12.43727,
    "lng": 79.48145
  },
  {
    "name": "Detroj, Gujarat, India",
    "lat": 23.33333333,
    "lng": 72.18333333
  },
  {
    "name": "Deulgaon Raja, Maharashtra, India",
    "lat": 20.01757,
    "lng": 76.03755
  },
  {
    "name": "Devadanappatti, Tamil Nadu, India",
    "lat": 10.14673,
    "lng": 77.6439
  },
  {
    "name": "Devakottai, Tamil Nadu, India",
    "lat": 9.94704,
    "lng": 78.8233
  },
  {
    "name": "Devanhalli, Karnataka, India",
    "lat": 13.24655,
    "lng": 77.71183
  },
  {
    "name": "Devaprayag, Uttarakhand, India",
    "lat": 30.14603,
    "lng": 78.60272
  },
  {
    "name": "Devarkonda, Telangana, India",
    "lat": 16.69186,
    "lng": 78.92073
  },
  {
    "name": "Devbhumi Dwarka, Gujarat, India",
    "lat": 22.20253,
    "lng": 69.65498
  },
  {
    "name": "Devgadh Bariya, Gujarat, India",
    "lat": 22.70517,
    "lng": 73.90882
  },
  {
    "name": "Devgarh, Rajasthan, India",
    "lat": 25.52533,
    "lng": 73.90812
  },
  {
    "name": "Devrukh, Maharashtra, India",
    "lat": 17.065,
    "lng": 73.61583333
  },
  {
    "name": "Dewa, Uttar Pradesh, India",
    "lat": 27.03621,
    "lng": 81.16692
  },
  {
    "name": "Dewas, Madhya Pradesh, India",
    "lat": 23,
    "lng": 76.16667
  },
  {
    "name": "Dhaka, Bangladesh",
    "lat": 23.8103,
    "lng": 90.4125
  },
  {
    "name": "Dhaka, Bihar, India",
    "lat": 26.67479,
    "lng": 85.16698
  },
  {
    "name": "Dhalai, Tripura, India",
    "lat": 23.84307,
    "lng": 91.92591
  },
  {
    "name": "Dhali, Tamil Nadu, India",
    "lat": 10.51049,
    "lng": 77.18806
  },
  {
    "name": "Dhamnod, Madhya Pradesh, India",
    "lat": 22.20928,
    "lng": 75.47057
  },
  {
    "name": "Dhampur, Uttar Pradesh, India",
    "lat": 29.30883,
    "lng": 78.51083
  },
  {
    "name": "Dhamtari, Chhattisgarh, India",
    "lat": 20.70718,
    "lng": 81.54874
  },
  {
    "name": "Dhana, Madhya Pradesh, India",
    "lat": 23.74697,
    "lng": 78.86234
  },
  {
    "name": "Dhanaula, Punjab, India",
    "lat": 30.28216,
    "lng": 75.57341
  },
  {
    "name": "Dhanaura, Uttar Pradesh, India",
    "lat": 28.95912,
    "lng": 78.25629
  },
  {
    "name": "Dhanbad, Jharkhand, India",
    "lat": 23.80199,
    "lng": 86.44324
  },
  {
    "name": "Dhandhuka, Gujarat, India",
    "lat": 22.38185,
    "lng": 71.98664
  },
  {
    "name": "Dhanera, Gujarat, India",
    "lat": 24.50967,
    "lng": 72.02343
  },
  {
    "name": "Dhanghata, Uttar Pradesh, India",
    "lat": 26.55419444,
    "lng": 83.00806111
  },
  {
    "name": "Dhaniakhali community development block, West Bengal, India",
    "lat": 22.97,
    "lng": 88.1
  },
  {
    "name": "Dhansura, Gujarat, India",
    "lat": 23.35,
    "lng": 73.2
  },
  {
    "name": "Dhanwar, Jharkhand, India",
    "lat": 24.41074,
    "lng": 85.98183
  },
  {
    "name": "Dhar, Madhya Pradesh, India",
    "lat": 22.59373,
    "lng": 75.29774
  },
  {
    "name": "Dharampur, Gujarat, India",
    "lat": 20.53693,
    "lng": 73.17368
  },
  {
    "name": "Dharampuri, Madhya Pradesh, India",
    "lat": 22.14951,
    "lng": 75.34439
  },
  {
    "name": "Dharamsala, Himachal Pradesh, India",
    "lat": 32.22006,
    "lng": 76.32013
  },
  {
    "name": "Dharangaon, Maharashtra, India",
    "lat": 21.01187,
    "lng": 75.27407
  },
  {
    "name": "Dharapuram, Tamil Nadu, India",
    "lat": 10.73828,
    "lng": 77.53223
  },
  {
    "name": "Dharasana, Gujarat, India",
    "lat": 20.68333333,
    "lng": 72.91666667
  },
  {
    "name": "Dharau, Uttar Pradesh, India",
    "lat": 26.38333333,
    "lng": 79.96666667
  },
  {
    "name": "Dharavi, Maharashtra, India",
    "lat": 19.05,
    "lng": 72.86667
  },
  {
    "name": "Dharchula, Uttarakhand, India",
    "lat": 29.84707,
    "lng": 80.51951
  },
  {
    "name": "Dhari, Gujarat, India",
    "lat": 21.32855,
    "lng": 71.02645
  },
  {
    "name": "Dhariwal, Punjab, India",
    "lat": 31.95616,
    "lng": 75.32386
  },
  {
    "name": "Dharmabad, Maharashtra, India",
    "lat": 18.89116,
    "lng": 77.8494
  },
  {
    "name": "Dharmadom, Kerala, India",
    "lat": 11.77538,
    "lng": 75.46459
  },
  {
    "name": "Dharmanagar, Tripura, India",
    "lat": 24.36667,
    "lng": 92.16667
  },
  {
    "name": "Dharmapuri, Tamil Nadu, India",
    "lat": 12.1277,
    "lng": 78.15794
  },
  {
    "name": "Dharmavaram, Andhra Pradesh, India",
    "lat": 14.41435,
    "lng": 77.72035
  },
  {
    "name": "Dharuhera, Haryana, India",
    "lat": 28.20553,
    "lng": 76.79691
  },
  {
    "name": "Dharur, Maharashtra, India",
    "lat": 18.82017,
    "lng": 76.10937
  },
  {
    "name": "Dharwad, Karnataka, India",
    "lat": 15.37,
    "lng": 75.14
  },
  {
    "name": "Dhasa, Gujarat, India",
    "lat": 21.8,
    "lng": 71.51666667
  },
  {
    "name": "Dhaulpur, Rajasthan, India",
    "lat": 26.71183,
    "lng": 77.73956
  },
  {
    "name": "Dhaurahra, Uttar Pradesh, India",
    "lat": 27.99814,
    "lng": 81.08975
  },
  {
    "name": "Dhawalpuri, Maharashtra, India",
    "lat": 19.16666667,
    "lng": 74.51666667
  },
  {
    "name": "Dhekiajuli, Assam, India",
    "lat": 26.70367,
    "lng": 92.47808
  },
  {
    "name": "Dhemaji, Assam, India",
    "lat": 27.6091,
    "lng": 94.7942
  },
  {
    "name": "Dhenkanal, Odisha, India",
    "lat": 20.75,
    "lng": 85.5
  },
  {
    "name": "Dhilwan, Punjab, India",
    "lat": 31.51432,
    "lng": 75.34574
  },
  {
    "name": "Dhing, Assam, India",
    "lat": 26.46793,
    "lng": 92.47336
  },
  {
    "name": "Dhola, Gujarat, India",
    "lat": 21.88129,
    "lng": 71.77269
  },
  {
    "name": "Dholera, Gujarat, India",
    "lat": 22.248,
    "lng": 72.195
  },
  {
    "name": "Dholka, Gujarat, India",
    "lat": 22.72732,
    "lng": 72.44128
  },
  {
    "name": "Dhone, Andhra Pradesh, India",
    "lat": 15.3952,
    "lng": 77.8715
  },
  {
    "name": "Dhoraji, Gujarat, India",
    "lat": 21.73359,
    "lng": 70.45004
  },
  {
    "name": "Dhrangadhra, Gujarat, India",
    "lat": 22.99167,
    "lng": 71.46793
  },
  {
    "name": "Dhrol, Gujarat, India",
    "lat": 22.567,
    "lng": 70.41769
  },
  {
    "name": "Dhubri, Assam, India",
    "lat": 26.06749,
    "lng": 90.02238
  },
  {
    "name": "Dhudi, Punjab, India",
    "lat": 30.69636,
    "lng": 74.85246
  },
  {
    "name": "Dhulagari, West Bengal, India",
    "lat": 22.58222222,
    "lng": 88.17111111
  },
  {
    "name": "Dhule, Maharashtra, India",
    "lat": 21.06852,
    "lng": 74.58837
  },
  {
    "name": "Dhulia, Maharashtra, India",
    "lat": 20.9013,
    "lng": 74.77737
  },
  {
    "name": "Dhulian, West Bengal, India",
    "lat": 24.68,
    "lng": 87.97
  },
  {
    "name": "Dhupguri, West Bengal, India",
    "lat": 26.6,
    "lng": 89.02
  },
  {
    "name": "Dhuri, Punjab, India",
    "lat": 30.36846,
    "lng": 75.86791
  },
  {
    "name": "Dhuwaran, Gujarat, India",
    "lat": 22.23779,
    "lng": 72.7591
  },
  {
    "name": "Diamond Harbour, West Bengal, India",
    "lat": 22.2,
    "lng": 88.2
  },
  {
    "name": "Dibai, Uttar Pradesh, India",
    "lat": 28.20849,
    "lng": 78.26173
  },
  {
    "name": "Dibang Valley, Arunachal Pradesh, India",
    "lat": 28.7,
    "lng": 95.7
  },
  {
    "name": "Dibrugarh, Assam, India",
    "lat": 27.5,
    "lng": 95
  },
  {
    "name": "Dicholi, Goa, India",
    "lat": 15.59319,
    "lng": 73.94571
  },
  {
    "name": "Didwana, Rajasthan, India",
    "lat": 27.40096,
    "lng": 74.57537
  },
  {
    "name": "Dig, Rajasthan, India",
    "lat": 27.47188,
    "lng": 77.32564
  },
  {
    "name": "Digapahandi, Odisha, India",
    "lat": 19.37275,
    "lng": 84.57184
  },
  {
    "name": "Digboi, Assam, India",
    "lat": 27.39321,
    "lng": 95.61839
  },
  {
    "name": "Digha, West Bengal, India",
    "lat": 21.68,
    "lng": 87.55
  },
  {
    "name": "Dighori, Maharashtra, India",
    "lat": 20.8862,
    "lng": 79.9342
  },
  {
    "name": "Dighwara, Bihar, India",
    "lat": 25.74434,
    "lng": 85.01003
  },
  {
    "name": "Diglur, Maharashtra, India",
    "lat": 18.54829,
    "lng": 77.57695
  },
  {
    "name": "Digras, Maharashtra, India",
    "lat": 20.1035,
    "lng": 77.71846
  },
  {
    "name": "Diguvametta, Andhra Pradesh, India",
    "lat": 15.39507,
    "lng": 78.8293
  },
  {
    "name": "Dima Hasao, Assam, India",
    "lat": 25.5,
    "lng": 93
  },
  {
    "name": "Dimapur, Nagaland, India",
    "lat": 25.77852,
    "lng": 93.78508
  },
  {
    "name": "Dina Nagar, Punjab, India",
    "lat": 32.13664,
    "lng": 75.47291
  },
  {
    "name": "Dinapore, Bihar, India",
    "lat": 25.63705,
    "lng": 85.04794
  },
  {
    "name": "Dindigul, Tamil Nadu, India",
    "lat": 10.4,
    "lng": 77.8
  },
  {
    "name": "Dindori Maharashtra, Maharashtra, India",
    "lat": 20.2,
    "lng": 73.83305556
  },
  {
    "name": "Dindori, Madhya Pradesh, India",
    "lat": 22.8,
    "lng": 81.1
  },
  {
    "name": "Dinhata, West Bengal, India",
    "lat": 26.13,
    "lng": 89.47
  },
  {
    "name": "Diphu, Assam, India",
    "lat": 25.84341,
    "lng": 93.43116
  },
  {
    "name": "Dirba, Punjab, India",
    "lat": 30.07222,
    "lng": 75.99607
  },
  {
    "name": "Disa, Gujarat, India",
    "lat": 24.25612,
    "lng": 72.17928
  },
  {
    "name": "Dispur, Assam, India",
    "lat": 26.13564,
    "lng": 91.80069
  },
  {
    "name": "Diu, Dadra and Nagar Haveli and Daman and Diu, India",
    "lat": 20.72081,
    "lng": 70.93989
  },
  {
    "name": "Diveagar, Maharashtra, India",
    "lat": 18.17333333,
    "lng": 72.99166667
  },
  {
    "name": "Divrasai, Uttar Pradesh, India",
    "lat": 26.819,
    "lng": 79.149
  },
  {
    "name": "Dod Ballapur, Karnataka, India",
    "lat": 13.29452,
    "lng": 77.53777
  },
  {
    "name": "Doda, Jammu and Kashmir, India",
    "lat": 33.14916,
    "lng": 75.54746
  },
  {
    "name": "Doha, Qatar",
    "lat": 25.2854,
    "lng": 51.531
  },
  {
    "name": "Dohad, Gujarat, India",
    "lat": 22.9,
    "lng": 74
  },
  {
    "name": "Dohrighat, Uttar Pradesh, India",
    "lat": 26.27217,
    "lng": 83.50916
  },
  {
    "name": "Doiwala, Uttarakhand, India",
    "lat": 30.17667,
    "lng": 78.11659
  },
  {
    "name": "Domariaganj, Uttar Pradesh, India",
    "lat": 27.22,
    "lng": 82.67
  },
  {
    "name": "Dombivli, Maharashtra, India",
    "lat": 19.21667,
    "lng": 73.08333
  },
  {
    "name": "Domjur, West Bengal, India",
    "lat": 22.64,
    "lng": 88.22
  },
  {
    "name": "Dondaicha, Maharashtra, India",
    "lat": 21.3236,
    "lng": 74.56804
  },
  {
    "name": "Dongargaon, Chhattisgarh, India",
    "lat": 20.97172,
    "lng": 80.85077
  },
  {
    "name": "Dongargarh, Chhattisgarh, India",
    "lat": 21.18893,
    "lng": 80.75459
  },
  {
    "name": "Dongri, Maharashtra, India",
    "lat": 19.28333333,
    "lng": 72.78333333
  },
  {
    "name": "Doraha, Punjab, India",
    "lat": 30.79953,
    "lng": 76.02355
  },
  {
    "name": "Dornakal, Telangana, India",
    "lat": 17.44475,
    "lng": 80.14905
  },
  {
    "name": "Dostpur, Uttar Pradesh, India",
    "lat": 26.27486,
    "lng": 82.47091
  },
  {
    "name": "Dubai, UAE",
    "lat": 25.2048,
    "lng": 55.2708
  },
  {
    "name": "Dubrajpur, West Bengal, India",
    "lat": 23.8,
    "lng": 87.38
  },
  {
    "name": "Dudhani, Maharashtra, India",
    "lat": 17.35792,
    "lng": 76.36688
  },
  {
    "name": "Dudhi, Uttar Pradesh, India",
    "lat": 24.21357,
    "lng": 83.24067
  },
  {
    "name": "Dugadda, Uttarakhand, India",
    "lat": 29.80673,
    "lng": 78.61109
  },
  {
    "name": "Dugda, Jharkhand, India",
    "lat": 23.74516,
    "lng": 86.17175
  },
  {
    "name": "Duliagaon, Assam, India",
    "lat": 27.37227,
    "lng": 95.30754
  },
  {
    "name": "Dum Duma, Assam, India",
    "lat": 27.56884,
    "lng": 95.55664
  },
  {
    "name": "Dumka, Jharkhand, India",
    "lat": 24.3,
    "lng": 87.25
  },
  {
    "name": "Dumkhal, Gujarat, India",
    "lat": 21.7396,
    "lng": 73.8449
  },
  {
    "name": "Dumra, Bihar, India",
    "lat": 26.56708,
    "lng": 85.5204
  },
  {
    "name": "Dumraon, Bihar, India",
    "lat": 25.55265,
    "lng": 84.15149
  },
  {
    "name": "Dungarpur, Gujarat, India",
    "lat": 21.28777,
    "lng": 71.7556
  },
  {
    "name": "Dungarpur, Rajasthan, India",
    "lat": 23.84306,
    "lng": 73.71466
  },
  {
    "name": "Durg, Chhattisgarh, India",
    "lat": 21.15,
    "lng": 81.4
  },
  {
    "name": "Durgapur Chandrapur, Maharashtra, India",
    "lat": 20,
    "lng": 79.3
  },
  {
    "name": "Durgapur, Maharashtra, India",
    "lat": 20.0054,
    "lng": 79.30273
  },
  {
    "name": "Durgapur, West Bengal, India",
    "lat": 23.55,
    "lng": 87.32
  },
  {
    "name": "Dusi, Tamil Nadu, India",
    "lat": 12.77574,
    "lng": 79.67892
  },
  {
    "name": "Dwarahat, Uttarakhand, India",
    "lat": 29.77785,
    "lng": 79.42731
  },
  {
    "name": "Dwarka, Gujarat, India",
    "lat": 22.23944,
    "lng": 68.96778
  },
  {
    "name": "East Delhi, Delhi, India",
    "lat": 28.66242,
    "lng": 77.29122
  },
  {
    "name": "East Garo Hills, Meghalaya, India",
    "lat": 25.61372,
    "lng": 90.62426
  },
  {
    "name": "East Godavari, Andhra Pradesh, India",
    "lat": 17.83333,
    "lng": 81.83333
  },
  {
    "name": "East Jaintia Hills, Meghalaya, India",
    "lat": 25.35976,
    "lng": 92.3668
  },
  {
    "name": "East Kameng, Arunachal Pradesh, India",
    "lat": 27.3,
    "lng": 93.05
  },
  {
    "name": "East Khasi Hills, Meghalaya, India",
    "lat": 25.3805,
    "lng": 91.78905
  },
  {
    "name": "East Siang, Arunachal Pradesh, India",
    "lat": 28.12379,
    "lng": 95.16339
  },
  {
    "name": "East, Sikkim, India",
    "lat": 27.33333,
    "lng": 88.66667
  },
  {
    "name": "Edakkulam, Kerala, India",
    "lat": 10.6102,
    "lng": 76.18352
  },
  {
    "name": "Egra, West Bengal, India",
    "lat": 21.9,
    "lng": 87.53
  },
  {
    "name": "Elamanchili, Andhra Pradesh, India",
    "lat": 17.54907,
    "lng": 82.85749
  },
  {
    "name": "Elayirampannai, Tamil Nadu, India",
    "lat": 9.27033,
    "lng": 77.82494
  },
  {
    "name": "Ellenabad, Haryana, India",
    "lat": 29.45282,
    "lng": 74.66122
  },
  {
    "name": "Ellore, Andhra Pradesh, India",
    "lat": 16.71311,
    "lng": 81.10437
  },
  {
    "name": "Elumalai, Tamil Nadu, India",
    "lat": 9.86501,
    "lng": 77.69923
  },
  {
    "name": "Elur, Kerala, India",
    "lat": 10.06667,
    "lng": 76.28333
  },
  {
    "name": "Emmiganur, Andhra Pradesh, India",
    "lat": 15.77203,
    "lng": 77.48345
  },
  {
    "name": "Eral, Tamil Nadu, India",
    "lat": 8.62584,
    "lng": 78.02282
  },
  {
    "name": "Erandol, Maharashtra, India",
    "lat": 20.92206,
    "lng": 75.32641
  },
  {
    "name": "Eraniel, Tamil Nadu, India",
    "lat": 8.20589,
    "lng": 77.31726
  },
  {
    "name": "Erattupetta, Kerala, India",
    "lat": 9.68747,
    "lng": 76.77891
  },
  {
    "name": "Ernakulam, Kerala, India",
    "lat": 10,
    "lng": 76.5
  },
  {
    "name": "Erode, Tamil Nadu, India",
    "lat": 11.34,
    "lng": 77.55
  },
  {
    "name": "Erraguntla, Andhra Pradesh, India",
    "lat": 14.63853,
    "lng": 78.53974
  },
  {
    "name": "Erumaippatti, Tamil Nadu, India",
    "lat": 11.14671,
    "lng": 78.28996
  },
  {
    "name": "Etah, Uttar Pradesh, India",
    "lat": 27.5,
    "lng": 78.75
  },
  {
    "name": "Etawa, Madhya Pradesh, India",
    "lat": 24.18351,
    "lng": 78.20289
  },
  {
    "name": "Etawah, Uttar Pradesh, India",
    "lat": 26.75,
    "lng": 79.25
  },
  {
    "name": "Etikoppaka, Andhra Pradesh, India",
    "lat": 17.5,
    "lng": 82.73333
  },
  {
    "name": "Etmadpur, Uttar Pradesh, India",
    "lat": 27.23971944,
    "lng": 78.2
  },
  {
    "name": "Ettaiyapuram, Tamil Nadu, India",
    "lat": 9.14405,
    "lng": 77.99066
  },
  {
    "name": "Faizabad, Uttar Pradesh, India",
    "lat": 26.75,
    "lng": 82
  },
  {
    "name": "Faizpur, Maharashtra, India",
    "lat": 21.16766,
    "lng": 75.86006
  },
  {
    "name": "Falakata, West Bengal, India",
    "lat": 26.53,
    "lng": 89.2
  },
  {
    "name": "Farah, Uttar Pradesh, India",
    "lat": 27.32081,
    "lng": 77.76185
  },
  {
    "name": "Farakka, West Bengal, India",
    "lat": 24.81667,
    "lng": 87.9
  },
  {
    "name": "Faridabad, Haryana, India",
    "lat": 28.41124,
    "lng": 77.31316
  },
  {
    "name": "Faridkot, Punjab, India",
    "lat": 30.67399,
    "lng": 74.75579
  },
  {
    "name": "Faridnagar, Uttar Pradesh, India",
    "lat": 28.76923,
    "lng": 77.62934
  },
  {
    "name": "Faridpur, Uttar Pradesh, India",
    "lat": 28.20997,
    "lng": 79.54149
  },
  {
    "name": "Farrukhabad, Uttar Pradesh, India",
    "lat": 27.5,
    "lng": 79.5
  },
  {
    "name": "Farrukhnagar, Haryana, India",
    "lat": 28.44745,
    "lng": 76.82391
  },
  {
    "name": "Farrukhnagar, Telangana, India",
    "lat": 17.07787,
    "lng": 78.20339
  },
  {
    "name": "Fatehabad, Haryana, India",
    "lat": 29.51525,
    "lng": 75.45554
  },
  {
    "name": "Fatehabad, Uttar Pradesh, India",
    "lat": 27.02645,
    "lng": 78.3027
  },
  {
    "name": "Fatehganj West, Uttar Pradesh, India",
    "lat": 28.4662,
    "lng": 79.30657
  },
  {
    "name": "Fatehgarh Churian, Punjab, India",
    "lat": 31.86431,
    "lng": 74.95665
  },
  {
    "name": "Fatehgarh Sahib, Punjab, India",
    "lat": 30.64379,
    "lng": 76.34787
  },
  {
    "name": "Fatehgarh, Uttar Pradesh, India",
    "lat": 27.36409,
    "lng": 79.63111
  },
  {
    "name": "Fatehpur (Barabanki), Uttar Pradesh, India",
    "lat": 27.17,
    "lng": 81.22
  },
  {
    "name": "Fatehpur Chaurasi, Uttar Pradesh, India",
    "lat": 26.78925,
    "lng": 80.26547
  },
  {
    "name": "Fatehpur Sikri, Uttar Pradesh, India",
    "lat": 27.0937,
    "lng": 77.66003
  },
  {
    "name": "Fatehpur, Rajasthan, India",
    "lat": 27.99486,
    "lng": 74.95628
  },
  {
    "name": "Fatehpur, Uttar Pradesh, India",
    "lat": 25.75,
    "lng": 80.75
  },
  {
    "name": "Fatwa, Bihar, India",
    "lat": 25.50958,
    "lng": 85.30504
  },
  {
    "name": "Fazilka, Punjab, India",
    "lat": 30.40207,
    "lng": 74.02836
  },
  {
    "name": "Ferokh, Kerala, India",
    "lat": 11.17989,
    "lng": 75.84141
  },
  {
    "name": "Firozabad, Uttar Pradesh, India",
    "lat": 27.20072,
    "lng": 78.42867
  },
  {
    "name": "Firozpur District, Punjab, India",
    "lat": 30.89,
    "lng": 74.56
  },
  {
    "name": "Firozpur Jhirka, Haryana, India",
    "lat": 27.78853,
    "lng": 76.94496
  },
  {
    "name": "Firozpur, Punjab, India",
    "lat": 30.92574,
    "lng": 74.61311
  },
  {
    "name": "Forbesganj, Bihar, India",
    "lat": 26.30253,
    "lng": 87.26556
  },
  {
    "name": "Fort Gloster, West Bengal, India",
    "lat": 22.50444444,
    "lng": 88.18333333
  },
  {
    "name": "Fort, Maharashtra, India",
    "lat": 18.935,
    "lng": 72.8359
  },
  {
    "name": "Frankfurt, Germany",
    "lat": 50.1109,
    "lng": 8.6821
  },
  {
    "name": "French Rocks, Karnataka, India",
    "lat": 12.50094,
    "lng": 76.67416
  },
  {
    "name": "Fyzabad, Uttar Pradesh, India",
    "lat": 26.77549,
    "lng": 82.15018
  },
  {
    "name": "Gadag-Betageri, Karnataka, India",
    "lat": 15.4167,
    "lng": 75.6167
  },
  {
    "name": "Gadag, Karnataka, India",
    "lat": 15.49835,
    "lng": 75.65187
  },
  {
    "name": "Gadarwara, Madhya Pradesh, India",
    "lat": 22.9235,
    "lng": 78.7849
  },
  {
    "name": "Gadchiroli, Maharashtra, India",
    "lat": 19.8,
    "lng": 80.2
  },
  {
    "name": "Gaddi Annaram, Telangana, India",
    "lat": 17.36687,
    "lng": 78.5242
  },
  {
    "name": "Gadhada, Gujarat, India",
    "lat": 21.96957,
    "lng": 71.57828
  },
  {
    "name": "Gadhinglaj, Maharashtra, India",
    "lat": 16.22291,
    "lng": 74.3501
  },
  {
    "name": "Gadwal, Telangana, India",
    "lat": 16.23504,
    "lng": 77.79556
  },
  {
    "name": "Gagret, Himachal Pradesh, India",
    "lat": 31.65846,
    "lng": 76.06144
  },
  {
    "name": "Gahlon, Uttar Pradesh, India",
    "lat": 26.53333333,
    "lng": 79.96666667
  },
  {
    "name": "Gahmar, Uttar Pradesh, India",
    "lat": 25.497,
    "lng": 83.822
  },
  {
    "name": "Gaighata community development block, West Bengal, India",
    "lat": 22.93,
    "lng": 88.73
  },
  {
    "name": "Gaini, Uttar Pradesh, India",
    "lat": 28.21,
    "lng": 79.16
  },
  {
    "name": "Gairkata, West Bengal, India",
    "lat": 26.68,
    "lng": 89.03
  },
  {
    "name": "Gajapati, Odisha, India",
    "lat": 18.91,
    "lng": 84.2
  },
  {
    "name": "Gajendragarh, Karnataka, India",
    "lat": 15.73628,
    "lng": 75.96976
  },
  {
    "name": "Gajraula, Uttar Pradesh, India",
    "lat": 28.8457,
    "lng": 78.2396
  },
  {
    "name": "Gajuwaka, Andhra Pradesh, India",
    "lat": 17.7,
    "lng": 83.21667
  },
  {
    "name": "Galiakot, Rajasthan, India",
    "lat": 23.51995,
    "lng": 74.02028
  },
  {
    "name": "Gandai, Chhattisgarh, India",
    "lat": 21.66667,
    "lng": 81.10013
  },
  {
    "name": "Ganderbal, Jammu and Kashmir, India",
    "lat": 34.29467,
    "lng": 75.19996
  },
  {
    "name": "Gandevi, Gujarat, India",
    "lat": 20.81214,
    "lng": 72.99811
  },
  {
    "name": "Gandhi Nagar, Tamil Nadu, India",
    "lat": 13.00639,
    "lng": 80.25417
  },
  {
    "name": "Gandhidham, Gujarat, India",
    "lat": 23.08333,
    "lng": 70.13333
  },
  {
    "name": "Gandhinagar, Gujarat, India",
    "lat": 23.21667,
    "lng": 72.68333
  },
  {
    "name": "Gangadharpur, West Bengal, India",
    "lat": 22.7604,
    "lng": 88.2218
  },
  {
    "name": "Gangaikondan, Tamil Nadu, India",
    "lat": 8.85785,
    "lng": 77.78019
  },
  {
    "name": "Gangakher, Maharashtra, India",
    "lat": 18.96962,
    "lng": 76.74946
  },
  {
    "name": "Ganganagar, Rajasthan, India",
    "lat": 29.92009,
    "lng": 73.87496
  },
  {
    "name": "Gangapur, Maharashtra, India",
    "lat": 19.69718,
    "lng": 75.01045
  },
  {
    "name": "Gangapur, Rajasthan, India",
    "lat": 26.47249,
    "lng": 76.71744
  },
  {
    "name": "Gangarampur, West Bengal, India",
    "lat": 25.4,
    "lng": 88.52
  },
  {
    "name": "Gangavalli, Tamil Nadu, India",
    "lat": 11.49828,
    "lng": 78.64966
  },
  {
    "name": "Gangawati, Karnataka, India",
    "lat": 15.4313,
    "lng": 76.52933
  },
  {
    "name": "Gangoh, Uttar Pradesh, India",
    "lat": 29.78004,
    "lng": 77.26346
  },
  {
    "name": "Gangolli, Karnataka, India",
    "lat": 13.65024,
    "lng": 74.67072
  },
  {
    "name": "Gangtok, Sikkim, India",
    "lat": 27.32574,
    "lng": 88.61216
  },
  {
    "name": "Ganguvada, Andhra Pradesh, India",
    "lat": 18.66667,
    "lng": 84.11667
  },
  {
    "name": "Ganj Dundawara, Uttar Pradesh, India",
    "lat": 27.73277778,
    "lng": 78.94166667
  },
  {
    "name": "Ganj Dundwara, Uttar Pradesh, India",
    "lat": 27.73308,
    "lng": 78.94119
  },
  {
    "name": "Ganj Muradabad, Uttar Pradesh, India",
    "lat": 26.95733,
    "lng": 80.184
  },
  {
    "name": "Ganjam, Odisha, India",
    "lat": 19.38705,
    "lng": 85.05079
  },
  {
    "name": "Gannavaram, Andhra Pradesh, India",
    "lat": 16.54092,
    "lng": 80.80213
  },
  {
    "name": "Ganpatipule, Maharashtra, India",
    "lat": 17.1448,
    "lng": 73.2666
  },
  {
    "name": "Garautha, Uttar Pradesh, India",
    "lat": 25.5719,
    "lng": 79.29764
  },
  {
    "name": "Gardhiwala, Punjab, India",
    "lat": 31.74147,
    "lng": 75.75567
  },
  {
    "name": "Garha Brahman, Madhya Pradesh, India",
    "lat": 23.86873,
    "lng": 77.35731
  },
  {
    "name": "Garhakota, Madhya Pradesh, India",
    "lat": 23.7791,
    "lng": 79.14321
  },
  {
    "name": "Garhi Pukhta, Uttar Pradesh, India",
    "lat": 29.5498,
    "lng": 77.30881
  },
  {
    "name": "Garhmuktesar, Uttar Pradesh, India",
    "lat": 28.78732,
    "lng": 78.10214
  },
  {
    "name": "Garhshankar, Punjab, India",
    "lat": 31.21537,
    "lng": 76.14149
  },
  {
    "name": "Garhwa, Jharkhand, India",
    "lat": 24.07494,
    "lng": 83.71023
  },
  {
    "name": "Garhwa, Uttar Pradesh, India",
    "lat": 24.18,
    "lng": 83.82
  },
  {
    "name": "Garhwal, Uttarakhand, India",
    "lat": 29.96366,
    "lng": 78.92853
  },
  {
    "name": "Gariaband, Chhattisgarh, India",
    "lat": 20.63323,
    "lng": 82.06221
  },
  {
    "name": "Gariadhar, Gujarat, India",
    "lat": 21.53889,
    "lng": 71.57737
  },
  {
    "name": "Garui, West Bengal, India",
    "lat": 22.63333333,
    "lng": 88.4
  },
  {
    "name": "Garulia, West Bengal, India",
    "lat": 22.82,
    "lng": 88.37
  },
  {
    "name": "Gaurela, Chhattisgarh, India",
    "lat": 22.75449,
    "lng": 81.90107
  },
  {
    "name": "Gauriganj, Uttar Pradesh, India",
    "lat": 26.206,
    "lng": 81.69
  },
  {
    "name": "Gauripur, Assam, India",
    "lat": 26.08334,
    "lng": 89.96118
  },
  {
    "name": "Gautam Buddha Nagar, Uttar Pradesh, India",
    "lat": 28.35898,
    "lng": 77.55076
  },
  {
    "name": "Gautampura, Madhya Pradesh, India",
    "lat": 22.98664,
    "lng": 75.51921
  },
  {
    "name": "Gawan, Uttar Pradesh, India",
    "lat": 28.41969,
    "lng": 78.35186
  },
  {
    "name": "Gaya, Bihar, India",
    "lat": 24.79686,
    "lng": 85.00385
  },
  {
    "name": "Gevrai, Maharashtra, India",
    "lat": 19.26372,
    "lng": 75.75007
  },
  {
    "name": "Ghanaur, Punjab, India",
    "lat": 30.33092,
    "lng": 76.61203
  },
  {
    "name": "Ghansor, Madhya Pradesh, India",
    "lat": 22.65976,
    "lng": 79.95013
  },
  {
    "name": "Gharaunda, Haryana, India",
    "lat": 29.53692,
    "lng": 76.97142
  },
  {
    "name": "Ghargaon, Maharashtra, India",
    "lat": 18.748684,
    "lng": 74.636734
  },
  {
    "name": "Gharghoda, Chhattisgarh, India",
    "lat": 22.17427,
    "lng": 83.3517
  },
  {
    "name": "Ghatal, West Bengal, India",
    "lat": 22.67,
    "lng": 87.72
  },
  {
    "name": "Ghatampur, Uttar Pradesh, India",
    "lat": 26.15272,
    "lng": 80.16803
  },
  {
    "name": "Ghatanji, Maharashtra, India",
    "lat": 20.14183,
    "lng": 78.31333
  },
  {
    "name": "Ghatkesar, Telangana, India",
    "lat": 17.45081,
    "lng": 78.68366
  },
  {
    "name": "Ghatkopar, Maharashtra, India",
    "lat": 19.08,
    "lng": 72.91
  },
  {
    "name": "Ghatsila, Jharkhand, India",
    "lat": 22.58531,
    "lng": 86.47682
  },
  {
    "name": "Ghaziabad, Uttar Pradesh, India",
    "lat": 28.66535,
    "lng": 77.43915
  },
  {
    "name": "Ghazipur, Uttar Pradesh, India",
    "lat": 25.58333,
    "lng": 83.58526
  },
  {
    "name": "Ghiror, Uttar Pradesh, India",
    "lat": 27.18912,
    "lng": 78.79312
  },
  {
    "name": "Gho Brahmanan de, Jammu and Kashmir, India",
    "lat": 32.5559,
    "lng": 74.9539
  },
  {
    "name": "Ghodasar, Gujarat, India",
    "lat": 24.45,
    "lng": 71.85
  },
  {
    "name": "Ghoga, Bihar, India",
    "lat": 25.21738,
    "lng": 87.1571
  },
  {
    "name": "Ghogha, Gujarat, India",
    "lat": 21.68813,
    "lng": 72.2763
  },
  {
    "name": "Ghorawal, Uttar Pradesh, India",
    "lat": 24.75459,
    "lng": 82.77965
  },
  {
    "name": "Ghosi, Uttar Pradesh, India",
    "lat": 26.10587,
    "lng": 83.5393
  },
  {
    "name": "Ghoti Budrukh, Maharashtra, India",
    "lat": 19.71641,
    "lng": 73.62821
  },
  {
    "name": "Ghugus, Maharashtra, India",
    "lat": 19.9381,
    "lng": 79.11192
  },
  {
    "name": "Ghumarwin, Himachal Pradesh, India",
    "lat": 31.44166,
    "lng": 76.71509
  },
  {
    "name": "Gidam, Chhattisgarh, India",
    "lat": 18.97431,
    "lng": 81.39894
  },
  {
    "name": "Giddalur, Andhra Pradesh, India",
    "lat": 15.37439,
    "lng": 78.92609
  },
  {
    "name": "Giddarbaha, Punjab, India",
    "lat": 30.19953,
    "lng": 74.66627
  },
  {
    "name": "Gingee, Tamil Nadu, India",
    "lat": 12.25282,
    "lng": 79.41727
  },
  {
    "name": "Gir Somnath, Gujarat, India",
    "lat": 20.91287,
    "lng": 70.3671
  },
  {
    "name": "Girgaon, Maharashtra, India",
    "lat": 18.953,
    "lng": 72.813
  },
  {
    "name": "Giria, West Bengal, India",
    "lat": 24.51666667,
    "lng": 88.06666667
  },
  {
    "name": "Giridih, Jharkhand, India",
    "lat": 24.25,
    "lng": 85.91667
  },
  {
    "name": "Goa Velha, Goa, India",
    "lat": 15.44384,
    "lng": 73.88572
  },
  {
    "name": "Goalpara, Assam, India",
    "lat": 26.12791,
    "lng": 90.60974
  },
  {
    "name": "Gobardanga, West Bengal, India",
    "lat": 22.87,
    "lng": 88.76
  },
  {
    "name": "Gobichettipalayam, Tamil Nadu, India",
    "lat": 11.45496,
    "lng": 77.4422
  },
  {
    "name": "Gobindapur, West Bengal, India",
    "lat": 22.59306,
    "lng": 88.09139
  },
  {
    "name": "Gobindpur, Jharkhand, India",
    "lat": 22.63393,
    "lng": 86.07162
  },
  {
    "name": "Godda, Jharkhand, India",
    "lat": 24.83333,
    "lng": 87.21667
  },
  {
    "name": "Godhra, Gujarat, India",
    "lat": 22.77547,
    "lng": 73.61488
  },
  {
    "name": "Gogapur, Madhya Pradesh, India",
    "lat": 23.55746,
    "lng": 75.51665
  },
  {
    "name": "Gohadi, Madhya Pradesh, India",
    "lat": 26.43278,
    "lng": 78.44205
  },
  {
    "name": "Gohana, Haryana, India",
    "lat": 29.13777,
    "lng": 76.70247
  },
  {
    "name": "Gohand, Uttar Pradesh, India",
    "lat": 25.69871,
    "lng": 79.54567
  },
  {
    "name": "Gohpur, Assam, India",
    "lat": 26.88184,
    "lng": 93.6156
  },
  {
    "name": "Gokak, Karnataka, India",
    "lat": 16.16901,
    "lng": 74.82393
  },
  {
    "name": "Gokarna, Karnataka, India",
    "lat": 14.55,
    "lng": 74.31667
  },
  {
    "name": "Gokavaram, Andhra Pradesh, India",
    "lat": 17.25823,
    "lng": 81.84985
  },
  {
    "name": "Gokul, Uttar Pradesh, India",
    "lat": 27.43926,
    "lng": 77.72019
  },
  {
    "name": "Gola Bazar, Uttar Pradesh, India",
    "lat": 26.3446,
    "lng": 83.35303
  },
  {
    "name": "Gola Gokarannath, Uttar Pradesh, India",
    "lat": 28.07837,
    "lng": 80.47054
  },
  {
    "name": "Golaghat, Assam, India",
    "lat": 26.4092,
    "lng": 93.91193
  },
  {
    "name": "Golakganj, Assam, India",
    "lat": 26.10216,
    "lng": 89.82275
  },
  {
    "name": "Gomati, Tripura, India",
    "lat": 23.53399,
    "lng": 91.48122
  },
  {
    "name": "Gomoh, Jharkhand, India",
    "lat": 23.87355,
    "lng": 86.1516
  },
  {
    "name": "Gonda, Uttar Pradesh, India",
    "lat": 27.18581,
    "lng": 81.96693
  },
  {
    "name": "Gondal, Gujarat, India",
    "lat": 21.96074,
    "lng": 70.80255
  },
  {
    "name": "Gondia, Maharashtra, India",
    "lat": 21.45,
    "lng": 80.2
  },
  {
    "name": "Gopalganj, Bihar, India",
    "lat": 26.5,
    "lng": 84.33333
  },
  {
    "name": "Gopalpur, Odisha, India",
    "lat": 19.25861,
    "lng": 84.90517
  },
  {
    "name": "Gopalpur, West Bengal, India",
    "lat": 22.61845,
    "lng": 88.75119
  },
  {
    "name": "Gopalur, Telangana, India",
    "lat": 16.6122,
    "lng": 77.80728
  },
  {
    "name": "Gopamau, Uttar Pradesh, India",
    "lat": 27.53468,
    "lng": 80.28507
  },
  {
    "name": "Gopinathpur, Jharkhand, India",
    "lat": 22.66301,
    "lng": 86.075
  },
  {
    "name": "Gopinathpur, West Bengal, India",
    "lat": 23.22,
    "lng": 88.15
  },
  {
    "name": "Gorai, Maharashtra, India",
    "lat": 19.250057,
    "lng": 72.782021
  },
  {
    "name": "Gorakhpur, Haryana, India",
    "lat": 29.44768,
    "lng": 75.67206
  },
  {
    "name": "Gorakhpur, Uttar Pradesh, India",
    "lat": 26.91667,
    "lng": 83.25
  },
  {
    "name": "Gorantla, Andhra Pradesh, India",
    "lat": 13.98411,
    "lng": 77.77224
  },
  {
    "name": "Goregaon, Maharashtra, India",
    "lat": 18.15483,
    "lng": 73.29147
  },
  {
    "name": "Goribidnur, Karnataka, India",
    "lat": 13.61072,
    "lng": 77.51738
  },
  {
    "name": "Gorubathan, West Bengal, India",
    "lat": 26.97,
    "lng": 88.7
  },
  {
    "name": "Gorur, Karnataka, India",
    "lat": 12.82297,
    "lng": 76.06463
  },
  {
    "name": "Gorwa, Gujarat, India",
    "lat": 22.3301,
    "lng": 73.1611
  },
  {
    "name": "Gosaba, West Bengal, India",
    "lat": 22.16,
    "lng": 88.8
  },
  {
    "name": "Gosainganj, Uttar Pradesh, India",
    "lat": 26.77,
    "lng": 81.12
  },
  {
    "name": "Gosanimari, West Bengal, India",
    "lat": 26.15,
    "lng": 89.36666667
  },
  {
    "name": "Goshainganj, Uttar Pradesh, India",
    "lat": 26.57115,
    "lng": 82.38091
  },
  {
    "name": "Goshaingaon, Assam, India",
    "lat": 26.43946,
    "lng": 89.96307
  },
  {
    "name": "Govardhan, Uttar Pradesh, India",
    "lat": 27.49658,
    "lng": 77.46263
  },
  {
    "name": "GovindapuramChilakaluripetGuntur, Andhra Pradesh, India",
    "lat": 16.15477,
    "lng": 80.10279
  },
  {
    "name": "Govindgarh, Madhya Pradesh, India",
    "lat": 24.37845,
    "lng": 81.29644
  },
  {
    "name": "Govindgarh, Rajasthan, India",
    "lat": 27.50423,
    "lng": 76.99938
  },
  {
    "name": "Greater Noida, Uttar Pradesh, India",
    "lat": 28.49615,
    "lng": 77.53601
  },
  {
    "name": "Gua, Jharkhand, India",
    "lat": 22.21361,
    "lng": 85.38774
  },
  {
    "name": "Gubbi, Karnataka, India",
    "lat": 13.31216,
    "lng": 76.94102
  },
  {
    "name": "Gudalur, Tamil Nadu, India",
    "lat": 9.67826,
    "lng": 77.24951
  },
  {
    "name": "Gudari, Odisha, India",
    "lat": 19.34762,
    "lng": 83.78128
  },
  {
    "name": "Gudibanda, Karnataka, India",
    "lat": 13.67099,
    "lng": 77.70414
  },
  {
    "name": "Gudivada, Andhra Pradesh, India",
    "lat": 16.43547,
    "lng": 80.99555
  },
  {
    "name": "Gudiyatham, Tamil Nadu, India",
    "lat": 12.94601,
    "lng": 78.87377
  },
  {
    "name": "Gudlavalleru, Andhra Pradesh, India",
    "lat": 16.35,
    "lng": 81.05
  },
  {
    "name": "Gudur, Andhra Pradesh, India",
    "lat": 14.15093,
    "lng": 79.8521
  },
  {
    "name": "Gudur, Telangana, India",
    "lat": 17.49174,
    "lng": 78.82302
  },
  {
    "name": "Guduvancheri, Tamil Nadu, India",
    "lat": 12.84519,
    "lng": 80.06055
  },
  {
    "name": "Guhagar, Maharashtra, India",
    "lat": 17.48415,
    "lng": 73.19289
  },
  {
    "name": "Guirim, Goa, India",
    "lat": 15.57552,
    "lng": 73.80722
  },
  {
    "name": "Gulabpura, Rajasthan, India",
    "lat": 25.90448,
    "lng": 74.66025
  },
  {
    "name": "Gulaothi, Uttar Pradesh, India",
    "lat": 28.58938,
    "lng": 77.79318
  },
  {
    "name": "Guledagudda, Karnataka, India",
    "lat": 16.05025,
    "lng": 75.78997
  },
  {
    "name": "Gumia, Jharkhand, India",
    "lat": 23.7975,
    "lng": 85.82523
  },
  {
    "name": "Gumla, Jharkhand, India",
    "lat": 23.08055,
    "lng": 84.53834
  },
  {
    "name": "Gummidipundi, Tamil Nadu, India",
    "lat": 13.40765,
    "lng": 80.10879
  },
  {
    "name": "Guna, Madhya Pradesh, India",
    "lat": 24.55464,
    "lng": 77.20082
  },
  {
    "name": "Gundlupet, Karnataka, India",
    "lat": 11.81004,
    "lng": 76.69027
  },
  {
    "name": "Gunnaur, Uttar Pradesh, India",
    "lat": 28.23995,
    "lng": 78.43994
  },
  {
    "name": "Guntakal Junction, Andhra Pradesh, India",
    "lat": 15.17112,
    "lng": 77.36244
  },
  {
    "name": "Guntur, Andhra Pradesh, India",
    "lat": 16.29974,
    "lng": 80.45729
  },
  {
    "name": "Gunupur, Odisha, India",
    "lat": 19.0804,
    "lng": 83.80879
  },
  {
    "name": "Gurdaha, West Bengal, India",
    "lat": 22.73472222,
    "lng": 88.75944444
  },
  {
    "name": "Gurdaspur, Punjab, India",
    "lat": 31.92,
    "lng": 75.27
  },
  {
    "name": "Gurh, Madhya Pradesh, India",
    "lat": 24.50265,
    "lng": 81.50037
  },
  {
    "name": "Gurmatkal, Karnataka, India",
    "lat": 16.86773,
    "lng": 77.39088
  },
  {
    "name": "Gursahaiganj, Uttar Pradesh, India",
    "lat": 27.11518,
    "lng": 79.73174
  },
  {
    "name": "Gursarai, Uttar Pradesh, India",
    "lat": 25.61677,
    "lng": 79.18053
  },
  {
    "name": "Guru Har Sahai, Punjab, India",
    "lat": 30.70862,
    "lng": 74.40407
  },
  {
    "name": "Gurugram, Haryana, India",
    "lat": 28.43891,
    "lng": 77.00592
  },
  {
    "name": "Guruvayur, Kerala, India",
    "lat": 10.5943,
    "lng": 76.0411
  },
  {
    "name": "Guskhara, West Bengal, India",
    "lat": 23.49277778,
    "lng": 87.73472222
  },
  {
    "name": "Guwahati, Assam, India",
    "lat": 26.1844,
    "lng": 91.7458
  },
  {
    "name": "Gwalior, Madhya Pradesh, India",
    "lat": 26.22983,
    "lng": 78.17337
  },
  {
    "name": "Gyalshing, Sikkim, India",
    "lat": 27.28952,
    "lng": 88.25764
  },
  {
    "name": "Gyanpur, Uttar Pradesh, India",
    "lat": 25.33268,
    "lng": 82.46637
  },
  {
    "name": "Habra, West Bengal, India",
    "lat": 22.83,
    "lng": 88.63
  },
  {
    "name": "Hadagalli, Karnataka, India",
    "lat": 15.02048,
    "lng": 75.93185
  },
  {
    "name": "Hadapsar Pune, Maharashtra, India",
    "lat": 18.49666667,
    "lng": 73.94166667
  },
  {
    "name": "Hadgaon, Maharashtra, India",
    "lat": 19.49552,
    "lng": 77.65863
  },
  {
    "name": "Haflong, Assam, India",
    "lat": 25.16478,
    "lng": 93.01744
  },
  {
    "name": "Hailakandi, Assam, India",
    "lat": 24.5017,
    "lng": 92.60069
  },
  {
    "name": "Hajan, Jammu and Kashmir, India",
    "lat": 34.29895,
    "lng": 74.61681
  },
  {
    "name": "Hajipur, Bihar, India",
    "lat": 25.68544,
    "lng": 85.20981
  },
  {
    "name": "Hajipur, Punjab, India",
    "lat": 31.97714,
    "lng": 75.75438
  },
  {
    "name": "Hajo, Assam, India",
    "lat": 26.2452,
    "lng": 91.52525
  },
  {
    "name": "Haldaur, Uttar Pradesh, India",
    "lat": 29.28988,
    "lng": 78.28437
  },
  {
    "name": "Haldia, West Bengal, India",
    "lat": 22.06046,
    "lng": 88.10975
  },
  {
    "name": "Haldibari, West Bengal, India",
    "lat": 26.33,
    "lng": 88.77
  },
  {
    "name": "Haldwani, Uttarakhand, India",
    "lat": 29.22254,
    "lng": 79.5286
  },
  {
    "name": "Halenda, Gujarat, India",
    "lat": 22.088185,
    "lng": 71.05171
  },
  {
    "name": "Halisahar, West Bengal, India",
    "lat": 22.95,
    "lng": 88.42
  },
  {
    "name": "Haliyal, Karnataka, India",
    "lat": 15.32864,
    "lng": 74.75638
  },
  {
    "name": "Halkarni, Maharashtra, India",
    "lat": 16.16666667,
    "lng": 74.46666667
  },
  {
    "name": "Halol, Gujarat, India",
    "lat": 22.50321,
    "lng": 73.47242
  },
  {
    "name": "Halvad, Gujarat, India",
    "lat": 23.01516,
    "lng": 71.18029
  },
  {
    "name": "Hamirpur, Himachal Pradesh, India",
    "lat": 31.75,
    "lng": 76.5
  },
  {
    "name": "Hamirpur, Uttar Pradesh, India",
    "lat": 25.75,
    "lng": 80
  },
  {
    "name": "Hampi, Karnataka, India",
    "lat": 15.3352,
    "lng": 76.4603
  },
  {
    "name": "Handia, Uttar Pradesh, India",
    "lat": 25.36379,
    "lng": 82.18655
  },
  {
    "name": "Hangal, Karnataka, India",
    "lat": 14.76465,
    "lng": 75.1246
  },
  {
    "name": "Hansi, Haryana, India",
    "lat": 29.10239,
    "lng": 75.96253
  },
  {
    "name": "Hansot, Gujarat, India",
    "lat": 21.58496,
    "lng": 72.80764
  },
  {
    "name": "Hanumangarh, Rajasthan, India",
    "lat": 29.11,
    "lng": 74.6
  },
  {
    "name": "Hapur, Uttar Pradesh, India",
    "lat": 28.72985,
    "lng": 77.78068
  },
  {
    "name": "Haraipur, Uttar Pradesh, India",
    "lat": 26.9,
    "lng": 79.7
  },
  {
    "name": "Haraiya, Uttar Pradesh, India",
    "lat": 26.79477,
    "lng": 82.46436
  },
  {
    "name": "Harangul, Maharashtra, India",
    "lat": 18.9,
    "lng": 76.66666667
  },
  {
    "name": "Harbatpur, Uttarakhand, India",
    "lat": 30.43863,
    "lng": 77.74058
  },
  {
    "name": "Harchandpur, Uttar Pradesh, India",
    "lat": 26.36,
    "lng": 81.17
  },
  {
    "name": "Harda Khas, Madhya Pradesh, India",
    "lat": 22.34414,
    "lng": 77.09536
  },
  {
    "name": "Harda, Madhya Pradesh, India",
    "lat": 22.23406,
    "lng": 76.96431
  },
  {
    "name": "Hardoi, Uttar Pradesh, India",
    "lat": 27.41667,
    "lng": 80.25
  },
  {
    "name": "Harduaganj, Uttar Pradesh, India",
    "lat": 27.94361,
    "lng": 78.15789
  },
  {
    "name": "Hariana, Punjab, India",
    "lat": 31.63512,
    "lng": 75.83887
  },
  {
    "name": "Haridwar, Uttarakhand, India",
    "lat": 29.94791,
    "lng": 78.16025
  },
  {
    "name": "Harihar, Karnataka, India",
    "lat": 14.51288,
    "lng": 75.80716
  },
  {
    "name": "Harij, Gujarat, India",
    "lat": 23.69356,
    "lng": 71.907
  },
  {
    "name": "Harindanga, West Bengal, India",
    "lat": 22.03333333,
    "lng": 88.31666667
  },
  {
    "name": "Haringhata, West Bengal, India",
    "lat": 22.95,
    "lng": 88.57
  },
  {
    "name": "Haripur, West Bengal, India",
    "lat": 22.93611,
    "lng": 88.23194
  },
  {
    "name": "Harnai, Maharashtra, India",
    "lat": 17.8134,
    "lng": 73.09668
  },
  {
    "name": "Harpalpur, Madhya Pradesh, India",
    "lat": 25.28773,
    "lng": 79.33279
  },
  {
    "name": "Harpanahalli, Karnataka, India",
    "lat": 14.78766,
    "lng": 75.98863
  },
  {
    "name": "Harrai, Madhya Pradesh, India",
    "lat": 22.61428,
    "lng": 79.22207
  },
  {
    "name": "Harsol, Gujarat, India",
    "lat": 23.36,
    "lng": 73.02
  },
  {
    "name": "Harsud, Madhya Pradesh, India",
    "lat": 22.09947,
    "lng": 76.73423
  },
  {
    "name": "Harur, Tamil Nadu, India",
    "lat": 12.05267,
    "lng": 78.48023
  },
  {
    "name": "Hasanpur, Haryana, India",
    "lat": 27.96944,
    "lng": 77.49544
  },
  {
    "name": "Hasanpur, Uttar Pradesh, India",
    "lat": 28.72249,
    "lng": 78.28436
  },
  {
    "name": "Hasimara, West Bengal, India",
    "lat": 26.75,
    "lng": 89.35
  },
  {
    "name": "Hassan, Karnataka, India",
    "lat": 12.95,
    "lng": 76.08333
  },
  {
    "name": "Hastinapur, Uttar Pradesh, India",
    "lat": 29.16042,
    "lng": 78.00762
  },
  {
    "name": "Hata (India), Uttar Pradesh, India",
    "lat": 26.75,
    "lng": 83.74
  },
  {
    "name": "Hata, Uttar Pradesh, India",
    "lat": 26.7412,
    "lng": 83.74526
  },
  {
    "name": "Hathras, Uttar Pradesh, India",
    "lat": 27.59551,
    "lng": 78.05201
  },
  {
    "name": "Hathuran, Gujarat, India",
    "lat": 21.5,
    "lng": 72.97
  },
  {
    "name": "Hatod, Madhya Pradesh, India",
    "lat": 22.79378,
    "lng": 75.73928
  },
  {
    "name": "Hatta, Madhya Pradesh, India",
    "lat": 24.13406,
    "lng": 79.60119
  },
  {
    "name": "Haveri, Karnataka, India",
    "lat": 14.73732,
    "lng": 75.41062
  },
  {
    "name": "Hayuliang, Arunachal Pradesh, India",
    "lat": 28.07301,
    "lng": 96.54305
  },
  {
    "name": "Hazaribag, Jharkhand, India",
    "lat": 24,
    "lng": 85.25
  },
  {
    "name": "Hazaribagh, Jharkhand, India",
    "lat": 23.99241,
    "lng": 85.36162
  },
  {
    "name": "Heggadadevankote, Karnataka, India",
    "lat": 12.08809,
    "lng": 76.32957
  },
  {
    "name": "Helwak, Maharashtra, India",
    "lat": 17.385,
    "lng": 73.735
  },
  {
    "name": "Hesla, Jharkhand, India",
    "lat": 24.06313,
    "lng": 85.87905
  },
  {
    "name": "Hilsa, Bihar, India",
    "lat": 25.31642,
    "lng": 85.28234
  },
  {
    "name": "Himatnagar, Gujarat, India",
    "lat": 23.59893,
    "lng": 72.96602
  },
  {
    "name": "Hindaun, Rajasthan, India",
    "lat": 26.73411,
    "lng": 77.03519
  },
  {
    "name": "Hindoria, Madhya Pradesh, India",
    "lat": 23.90345,
    "lng": 79.56861
  },
  {
    "name": "Hindupur, Andhra Pradesh, India",
    "lat": 13.82807,
    "lng": 77.49143
  },
  {
    "name": "Hindusthan Cables Town, West Bengal, India",
    "lat": 23.82,
    "lng": 86.9
  },
  {
    "name": "Hinganghat, Maharashtra, India",
    "lat": 20.54875,
    "lng": 78.83978
  },
  {
    "name": "Hingoli, Maharashtra, India",
    "lat": 19.7,
    "lng": 77.15
  },
  {
    "name": "Hinjilikatu, Odisha, India",
    "lat": 19.48166,
    "lng": 84.74489
  },
  {
    "name": "Hirakud, Odisha, India",
    "lat": 21.52502,
    "lng": 83.87275
  },
  {
    "name": "Hiranagar, Jammu and Kashmir, India",
    "lat": 32.45493,
    "lng": 75.27187
  },
  {
    "name": "Hirapur Hamesha, Maharashtra, India",
    "lat": 21.55546,
    "lng": 79.78581
  },
  {
    "name": "Hirapur, Maharashtra, India",
    "lat": 21.53,
    "lng": 79.77
  },
  {
    "name": "Hirekerur, Karnataka, India",
    "lat": 14.45506,
    "lng": 75.3952
  },
  {
    "name": "Hiriyur, Karnataka, India",
    "lat": 13.94455,
    "lng": 76.61723
  },
  {
    "name": "Hisar, Haryana, India",
    "lat": 29.15394,
    "lng": 75.72294
  },
  {
    "name": "Hisua, Bihar, India",
    "lat": 24.8336,
    "lng": 85.41729
  },
  {
    "name": "Hodal, Haryana, India",
    "lat": 27.89196,
    "lng": 77.36744
  },
  {
    "name": "Hojai, Assam, India",
    "lat": 26.00281,
    "lng": 92.85605
  },
  {
    "name": "Holalkere, Karnataka, India",
    "lat": 14.04295,
    "lng": 76.18496
  },
  {
    "name": "Hole Narsipur, Karnataka, India",
    "lat": 12.78635,
    "lng": 76.24331
  },
  {
    "name": "Homnabad, Karnataka, India",
    "lat": 17.77074,
    "lng": 77.12519
  },
  {
    "name": "Honavar, Karnataka, India",
    "lat": 14.28088,
    "lng": 74.44497
  },
  {
    "name": "Hong Kong",
    "lat": 22.3193,
    "lng": 114.1694
  },
  {
    "name": "Honnali, Karnataka, India",
    "lat": 14.23976,
    "lng": 75.64507
  },
  {
    "name": "Hooghly, West Bengal, India",
    "lat": 22.91,
    "lng": 88.39
  },
  {
    "name": "Hosanagara, Karnataka, India",
    "lat": 13.91387,
    "lng": 75.06503
  },
  {
    "name": "Hosangadi, Karnataka, India",
    "lat": 13.69756,
    "lng": 74.95427
  },
  {
    "name": "Hosdurga, Karnataka, India",
    "lat": 13.79631,
    "lng": 76.28408
  },
  {
    "name": "Hoshangabad, Madhya Pradesh, India",
    "lat": 22.58827,
    "lng": 77.98887
  },
  {
    "name": "Hoshiarpur, Punjab, India",
    "lat": 31.53723,
    "lng": 75.91269
  },
  {
    "name": "Hoskote, Karnataka, India",
    "lat": 13.0707,
    "lng": 77.79814
  },
  {
    "name": "Hospet, Karnataka, India",
    "lat": 15.26954,
    "lng": 76.3871
  },
  {
    "name": "Hosur, Tamil Nadu, India",
    "lat": 12.73647,
    "lng": 77.83264
  },
  {
    "name": "Hotgi, Maharashtra, India",
    "lat": 17.58333333,
    "lng": 75.98333333
  },
  {
    "name": "Houston, TX, USA",
    "lat": 29.7604,
    "lng": -95.3698
  },
  {
    "name": "Howli, Assam, India",
    "lat": 26.42237,
    "lng": 90.98004
  },
  {
    "name": "Howrah, West Bengal, India",
    "lat": 22.57688,
    "lng": 88.31857
  },
  {
    "name": "Hubballi, Karnataka, India",
    "lat": 15.34776,
    "lng": 75.13378
  },
  {
    "name": "Hukeri, Karnataka, India",
    "lat": 16.23082,
    "lng": 74.60244
  },
  {
    "name": "Hulas, Uttar Pradesh, India",
    "lat": 29.69027778,
    "lng": 77.36027778
  },
  {
    "name": "Hungund, Karnataka, India",
    "lat": 16.06213,
    "lng": 76.0586
  },
  {
    "name": "Hunsur, Karnataka, India",
    "lat": 12.30359,
    "lng": 76.29275
  },
  {
    "name": "Husainabad, Jharkhand, India",
    "lat": 24.52849,
    "lng": 84
  },
  {
    "name": "Hyderabad, Telangana, India",
    "lat": 17.38405,
    "lng": 78.45636
  },
  {
    "name": "Iawar, Madhya Pradesh, India",
    "lat": 23.00943,
    "lng": 76.5007
  },
  {
    "name": "Ibrahimpur, Uttar Pradesh, India",
    "lat": 26.01027778,
    "lng": 83.16861111
  },
  {
    "name": "Ichalkaranji, Maharashtra, India",
    "lat": 16.69117,
    "lng": 74.46054
  },
  {
    "name": "Ichapur, West Bengal, India",
    "lat": 22.80499,
    "lng": 88.37088
  },
  {
    "name": "Ichchapuram, Andhra Pradesh, India",
    "lat": 19.11393,
    "lng": 84.68721
  },
  {
    "name": "Ichhawar, Madhya Pradesh, India",
    "lat": 23.02816,
    "lng": 77.01729
  },
  {
    "name": "Idappadi, Tamil Nadu, India",
    "lat": 11.58624,
    "lng": 77.83891
  },
  {
    "name": "Idar, Gujarat, India",
    "lat": 23.83,
    "lng": 73
  },
  {
    "name": "Idukki, Kerala, India",
    "lat": 10,
    "lng": 77
  },
  {
    "name": "Igatpuri, Maharashtra, India",
    "lat": 19.69522,
    "lng": 73.5626
  },
  {
    "name": "Iglas, Uttar Pradesh, India",
    "lat": 27.711,
    "lng": 77.93967
  },
  {
    "name": "Ikauna, Uttar Pradesh, India",
    "lat": 27.53097,
    "lng": 81.96917
  },
  {
    "name": "Iklehra, Madhya Pradesh, India",
    "lat": 23.14667,
    "lng": 76.39044
  },
  {
    "name": "Ilampillai, Tamil Nadu, India",
    "lat": 11.60659,
    "lng": 78.00676
  },
  {
    "name": "Ilkal, Karnataka, India",
    "lat": 15.95923,
    "lng": 76.11351
  },
  {
    "name": "Iluppur, Tamil Nadu, India",
    "lat": 10.51347,
    "lng": 78.62357
  },
  {
    "name": "Imphal East, Manipur, India",
    "lat": 24.7911,
    "lng": 93.9348
  },
  {
    "name": "Imphal West, Manipur, India",
    "lat": 24.60998,
    "lng": 93.88873
  },
  {
    "name": "Inda Chhoi, Haryana, India",
    "lat": 29.64042,
    "lng": 75.79041
  },
  {
    "name": "Indapur, Maharashtra, India",
    "lat": 18.3,
    "lng": 73.25
  },
  {
    "name": "Indergarh, Uttar Pradesh, India",
    "lat": 26.93521,
    "lng": 79.6712
  },
  {
    "name": "Indi, Karnataka, India",
    "lat": 17.17735,
    "lng": 75.9526
  },
  {
    "name": "Indore, Madhya Pradesh, India",
    "lat": 22.66667,
    "lng": 75.75
  },
  {
    "name": "Indpur community development block, West Bengal, India",
    "lat": 23.1667,
    "lng": 86.9333
  },
  {
    "name": "Indragarh, Uttar Pradesh, India",
    "lat": 29.91299444,
    "lng": 74.32284167
  },
  {
    "name": "Indri, Haryana, India",
    "lat": 29.87999,
    "lng": 77.05972
  },
  {
    "name": "Ingraj Bazar, West Bengal, India",
    "lat": 25.00447,
    "lng": 88.14573
  },
  {
    "name": "Injambakkam, Tamil Nadu, India",
    "lat": 12.9162,
    "lng": 80.2488
  },
  {
    "name": "Iringal, Kerala, India",
    "lat": 11.55929,
    "lng": 75.61663
  },
  {
    "name": "Irinjalakuda, Kerala, India",
    "lat": 10.34238,
    "lng": 76.21124
  },
  {
    "name": "Irugur, Tamil Nadu, India",
    "lat": 11.01782,
    "lng": 77.06285
  },
  {
    "name": "Isagarh, Madhya Pradesh, India",
    "lat": 24.83906,
    "lng": 77.88274
  },
  {
    "name": "Ishanpur, Punjab, India",
    "lat": 30.63929,
    "lng": 76.11761
  },
  {
    "name": "Islamabad, Pakistan",
    "lat": 33.6844,
    "lng": 73.0479
  },
  {
    "name": "Islamnagar (Badaun), Uttar Pradesh, India",
    "lat": 28.33,
    "lng": 78.72
  },
  {
    "name": "Islamnagar, Uttar Pradesh, India",
    "lat": 28.32896,
    "lng": 78.72524
  },
  {
    "name": "Islampur, Bihar, India",
    "lat": 25.14075,
    "lng": 85.20587
  },
  {
    "name": "Islampur, West Bengal, India",
    "lat": 26.27,
    "lng": 88.2
  },
  {
    "name": "Itanagar, Arunachal Pradesh, India",
    "lat": 27.08694,
    "lng": 93.60987
  },
  {
    "name": "Itarsi, Madhya Pradesh, India",
    "lat": 22.61477,
    "lng": 77.76222
  },
  {
    "name": "Itaunja, Uttar Pradesh, India",
    "lat": 27.08347,
    "lng": 80.89672
  },
  {
    "name": "Itimadpur, Uttar Pradesh, India",
    "lat": 27.23541,
    "lng": 78.19829
  },
  {
    "name": "Jabalpur, Madhya Pradesh, India",
    "lat": 23.16,
    "lng": 79.95
  },
  {
    "name": "Jafarpur, West Bengal, India",
    "lat": 22.32,
    "lng": 88.23
  },
  {
    "name": "Jagadhri, Haryana, India",
    "lat": 30.16719,
    "lng": 77.30367
  },
  {
    "name": "Jagalur, Karnataka, India",
    "lat": 14.51957,
    "lng": 76.33915
  },
  {
    "name": "Jagannathpur, Jharkhand, India",
    "lat": 22.22115,
    "lng": 85.63917
  },
  {
    "name": "Jagatsinghpur, Odisha, India",
    "lat": 20.2,
    "lng": 86.3
  },
  {
    "name": "Jagdalpur, Chhattisgarh, India",
    "lat": 19.08136,
    "lng": 82.02131
  },
  {
    "name": "Jagdishpur, Uttar Pradesh, India",
    "lat": 26.74967,
    "lng": 80.5451
  },
  {
    "name": "Jagdispur, Bihar, India",
    "lat": 25.46811,
    "lng": 84.41939
  },
  {
    "name": "Jaggayyapeta, Andhra Pradesh, India",
    "lat": 16.8938,
    "lng": 80.09807
  },
  {
    "name": "Jagnair, Uttar Pradesh, India",
    "lat": 26.8636,
    "lng": 77.60231
  },
  {
    "name": "Jagraon, Punjab, India",
    "lat": 30.78783,
    "lng": 75.47391
  },
  {
    "name": "Jagtial, Telangana, India",
    "lat": 18.79473,
    "lng": 78.91661
  },
  {
    "name": "Jahanabad (Pilibhit), Uttar Pradesh, India",
    "lat": 28.6333,
    "lng": 79.8
  },
  {
    "name": "Jahanabad, Bihar, India",
    "lat": 25.21368,
    "lng": 84.9871
  },
  {
    "name": "Jahanabad, Uttar Pradesh, India",
    "lat": 28.63025,
    "lng": 79.71818
  },
  {
    "name": "Jahangirabad, Uttar Pradesh, India",
    "lat": 28.40549,
    "lng": 78.10588
  },
  {
    "name": "Jahangirpur, Uttar Pradesh, India",
    "lat": 28.17919,
    "lng": 77.70501
  },
  {
    "name": "Jahazpur, Rajasthan, India",
    "lat": 25.61994,
    "lng": 75.27609
  },
  {
    "name": "Jaigaon, West Bengal, India",
    "lat": 26.86666667,
    "lng": 89.38333333
  },
  {
    "name": "Jainpur, Uttar Pradesh, India",
    "lat": 26.15389,
    "lng": 83.33505
  },
  {
    "name": "Jaipur, Rajasthan, India",
    "lat": 27,
    "lng": 76
  },
  {
    "name": "Jais, Uttar Pradesh, India",
    "lat": 26.2649,
    "lng": 81.54855
  },
  {
    "name": "Jaisalmer, Rajasthan, India",
    "lat": 26.99382,
    "lng": 71.00889
  },
  {
    "name": "Jaisinghnagar, Madhya Pradesh, India",
    "lat": 23.68582,
    "lng": 81.39085
  },
  {
    "name": "Jaisingpur, Maharashtra, India",
    "lat": 16.77639,
    "lng": 74.55361
  },
  {
    "name": "Jaitapur, Maharashtra, India",
    "lat": 16.59,
    "lng": 73.35
  },
  {
    "name": "Jaitaran, Rajasthan, India",
    "lat": 26.20446,
    "lng": 73.93676
  },
  {
    "name": "Jaithari, Madhya Pradesh, India",
    "lat": 23.20856,
    "lng": 78.61487
  },
  {
    "name": "Jaito, Punjab, India",
    "lat": 30.45126,
    "lng": 74.89189
  },
  {
    "name": "Jajpur, Odisha, India",
    "lat": 20.84149,
    "lng": 86.31237
  },
  {
    "name": "Jakarta, Indonesia",
    "lat": -6.2088,
    "lng": 106.8456
  },
  {
    "name": "Jakhal, Haryana, India",
    "lat": 29.79627,
    "lng": 75.82392
  },
  {
    "name": "Jakhangaon, Maharashtra, India",
    "lat": 17.64639,
    "lng": 74.32111
  },
  {
    "name": "Jakhau, Gujarat, India",
    "lat": 23.21861111,
    "lng": 68.71694444
  },
  {
    "name": "Jalakandapuram, Tamil Nadu, India",
    "lat": 11.69779,
    "lng": 77.87298
  },
  {
    "name": "Jalalabad, Punjab, India",
    "lat": 30.60622,
    "lng": 74.25727
  },
  {
    "name": "Jalalabad, Uttar Pradesh, India",
    "lat": 29.61853,
    "lng": 77.43908
  },
  {
    "name": "Jalali, Uttar Pradesh, India",
    "lat": 27.8668,
    "lng": 78.25267
  },
  {
    "name": "Jalalpore, Gujarat, India",
    "lat": 20.9491,
    "lng": 72.9136
  },
  {
    "name": "Jalalpur, Gujarat, India",
    "lat": 20.94896,
    "lng": 72.89829
  },
  {
    "name": "Jalalpur, Uttar Pradesh, India",
    "lat": 26.31162,
    "lng": 82.73859
  },
  {
    "name": "Jalandhar, Punjab, India",
    "lat": 31.41667,
    "lng": 75.61667
  },
  {
    "name": "Jalarpet, Tamil Nadu, India",
    "lat": 12.57025,
    "lng": 78.57318
  },
  {
    "name": "Jalaun, Uttar Pradesh, India",
    "lat": 26,
    "lng": 79.5
  },
  {
    "name": "Jalesar, Uttar Pradesh, India",
    "lat": 27.47315,
    "lng": 78.3031
  },
  {
    "name": "Jaleshwar, Odisha, India",
    "lat": 21.80176,
    "lng": 87.2225
  },
  {
    "name": "Jalgaon Jamod, Maharashtra, India",
    "lat": 21.05194,
    "lng": 76.53464
  },
  {
    "name": "Jalgaon, Maharashtra, India",
    "lat": 21.00292,
    "lng": 75.56602
  },
  {
    "name": "Jalia, Gujarat, India",
    "lat": 21.8,
    "lng": 70.25
  },
  {
    "name": "Jalkot, Maharashtra, India",
    "lat": 18.62916667,
    "lng": 77.18111111
  },
  {
    "name": "Jalna, Maharashtra, India",
    "lat": 19.8,
    "lng": 75.9
  },
  {
    "name": "Jalor, Rajasthan, India",
    "lat": 25.34558,
    "lng": 72.61559
  },
  {
    "name": "Jalore, Rajasthan, India",
    "lat": 25.08,
    "lng": 72.29
  },
  {
    "name": "Jalpaiguri, West Bengal, India",
    "lat": 26.51666667,
    "lng": 88.73333333
  },
  {
    "name": "Jamadoba, Jharkhand, India",
    "lat": 23.71667,
    "lng": 86.4
  },
  {
    "name": "Jamai, Madhya Pradesh, India",
    "lat": 22.19644,
    "lng": 78.59191
  },
  {
    "name": "Jamalpur, Bihar, India",
    "lat": 25.31258,
    "lng": 86.48888
  },
  {
    "name": "Jambuda, Gujarat, India",
    "lat": 22.51666667,
    "lng": 70.21666667
  },
  {
    "name": "Jambusar, Gujarat, India",
    "lat": 22.05236,
    "lng": 72.80074
  },
  {
    "name": "Jamkhandi, Karnataka, India",
    "lat": 16.50461,
    "lng": 75.29146
  },
  {
    "name": "Jamkhed, Maharashtra, India",
    "lat": 18.72,
    "lng": 75.32
  },
  {
    "name": "Jammalamadugu, Andhra Pradesh, India",
    "lat": 14.84677,
    "lng": 78.38314
  },
  {
    "name": "Jammu, Jammu and Kashmir, India",
    "lat": 32.75,
    "lng": 74.83333
  },
  {
    "name": "Jamnagar, Gujarat, India",
    "lat": 22.47292,
    "lng": 70.06673
  },
  {
    "name": "Jamod, Maharashtra, India",
    "lat": 21.1,
    "lng": 76.6
  },
  {
    "name": "Jamshedpur, Jharkhand, India",
    "lat": 22.80278,
    "lng": 86.18545
  },
  {
    "name": "Jamtara, Jharkhand, India",
    "lat": 24,
    "lng": 86.85
  },
  {
    "name": "Jamui, Bihar, India",
    "lat": 24.92082,
    "lng": 86.17538
  },
  {
    "name": "Jamuria, West Bengal, India",
    "lat": 23.7,
    "lng": 87.08
  },
  {
    "name": "Jandiala Guru, Punjab, India",
    "lat": 31.56198,
    "lng": 75.0277
  },
  {
    "name": "Jandiala, Punjab, India",
    "lat": 31.1593,
    "lng": 75.61755
  },
  {
    "name": "Janephal, Maharashtra, India",
    "lat": 20.29361111,
    "lng": 76.57583333
  },
  {
    "name": "Jangaon, Telangana, India",
    "lat": 17.72602,
    "lng": 79.15236
  },
  {
    "name": "Janghai, Uttar Pradesh, India",
    "lat": 25.55,
    "lng": 82.31666667
  },
  {
    "name": "Jangipur, West Bengal, India",
    "lat": 24.47001,
    "lng": 88.07659
  },
  {
    "name": "Janjgir-Champa, Chhattisgarh, India",
    "lat": 21.9,
    "lng": 82.7
  },
  {
    "name": "Janjgir, Chhattisgarh, India",
    "lat": 22.00922,
    "lng": 82.5778
  },
  {
    "name": "Jansath, Uttar Pradesh, India",
    "lat": 29.32502,
    "lng": 77.85044
  },
  {
    "name": "Jaoli, Maharashtra, India",
    "lat": 17.9,
    "lng": 76.4
  },
  {
    "name": "Jaora, Madhya Pradesh, India",
    "lat": 23.63783,
    "lng": 75.12711
  },
  {
    "name": "Jarod, Gujarat, India",
    "lat": 22.433,
    "lng": 73.333
  },
  {
    "name": "Jarwa, Uttar Pradesh, India",
    "lat": 27.65,
    "lng": 82.51666667
  },
  {
    "name": "Jarwal, Uttar Pradesh, India",
    "lat": 27.1629,
    "lng": 81.54179
  },
  {
    "name": "Jasdan, Gujarat, India",
    "lat": 22.03709,
    "lng": 71.20794
  },
  {
    "name": "Jashpur, Chhattisgarh, India",
    "lat": 22.78495,
    "lng": 83.84573
  },
  {
    "name": "Jashpurnagar, Chhattisgarh, India",
    "lat": 22.88783,
    "lng": 84.13864
  },
  {
    "name": "Jasidih, Jharkhand, India",
    "lat": 24.51379,
    "lng": 86.64576
  },
  {
    "name": "Jaspur, Uttarakhand, India",
    "lat": 29.27919,
    "lng": 78.82798
  },
  {
    "name": "Jasrana, Uttar Pradesh, India",
    "lat": 27.23587,
    "lng": 78.65244
  },
  {
    "name": "Jaswantnagar, Uttar Pradesh, India",
    "lat": 26.88271,
    "lng": 78.90256
  },
  {
    "name": "Jat Sangli, Maharashtra, India",
    "lat": 17.05,
    "lng": 75.21666667
  },
  {
    "name": "Jatani, Odisha, India",
    "lat": 20.15975,
    "lng": 85.70742
  },
  {
    "name": "Jatara, Madhya Pradesh, India",
    "lat": 25.00964,
    "lng": 79.04869
  },
  {
    "name": "Jategaon, Maharashtra, India",
    "lat": 19.91666667,
    "lng": 73.65
  },
  {
    "name": "Jaunpur, Uttar Pradesh, India",
    "lat": 25.75,
    "lng": 82.75
  },
  {
    "name": "Jaurian, Jammu and Kashmir, India",
    "lat": 32.83255,
    "lng": 74.57612
  },
  {
    "name": "Jawad, Madhya Pradesh, India",
    "lat": 24.59916,
    "lng": 74.86261
  },
  {
    "name": "Jawala Mukhi, Himachal Pradesh, India",
    "lat": 31.87456,
    "lng": 76.32013
  },
  {
    "name": "Jawhar, Maharashtra, India",
    "lat": 19.91213,
    "lng": 73.22679
  },
  {
    "name": "Jayamkondacholapuram, Tamil Nadu, India",
    "lat": 11.21266,
    "lng": 79.36369
  },
  {
    "name": "Jayashankar Bhupalapally, Telangana, India",
    "lat": 18.19678,
    "lng": 79.93976
  },
  {
    "name": "Jaynagar Majilpur, West Bengal, India",
    "lat": 22.17722222,
    "lng": 88.42583333
  },
  {
    "name": "Jaynagar, Bihar, India",
    "lat": 26.59048,
    "lng": 86.13791
  },
  {
    "name": "Jaysingpur, Maharashtra, India",
    "lat": 16.78350556,
    "lng": 74.56644167
  },
  {
    "name": "Jeddah, Saudi Arabia",
    "lat": 21.5433,
    "lng": 39.1728
  },
  {
    "name": "Jehanabad, Bihar, India",
    "lat": 25.20701,
    "lng": 84.99573
  },
  {
    "name": "Jejur, West Bengal, India",
    "lat": 22.88,
    "lng": 88.12
  },
  {
    "name": "Jejuri, Maharashtra, India",
    "lat": 18.27658,
    "lng": 74.16008
  },
  {
    "name": "Jetalpur, Gujarat, India",
    "lat": 22.88333333,
    "lng": 72.6
  },
  {
    "name": "Jetalsar, Gujarat, India",
    "lat": 21.70891,
    "lng": 70.57695
  },
  {
    "name": "Jetpur, Gujarat, India",
    "lat": 21.7543725,
    "lng": 70.6189391
  },
  {
    "name": "Jevargi, Karnataka, India",
    "lat": 17.01394,
    "lng": 76.77317
  },
  {
    "name": "Jewar, Uttar Pradesh, India",
    "lat": 28.122,
    "lng": 77.55734
  },
  {
    "name": "Jeypore, Odisha, India",
    "lat": 18.8563,
    "lng": 82.5716
  },
  {
    "name": "Jha-Jha, Bihar, India",
    "lat": 24.77107,
    "lng": 86.37888
  },
  {
    "name": "Jhabua, Madhya Pradesh, India",
    "lat": 22.76772,
    "lng": 74.59087
  },
  {
    "name": "Jhajhar, Uttar Pradesh, India",
    "lat": 27.86,
    "lng": 75.28
  },
  {
    "name": "Jhajjar, Haryana, India",
    "lat": 28.6063,
    "lng": 76.6565
  },
  {
    "name": "Jhalawar, Rajasthan, India",
    "lat": 24.59633,
    "lng": 76.16499
  },
  {
    "name": "Jhalida, West Bengal, India",
    "lat": 23.36541,
    "lng": 85.97581
  },
  {
    "name": "Jhalod, Gujarat, India",
    "lat": 23.10027778,
    "lng": 74.15611111
  },
  {
    "name": "Jhalrapatan, Rajasthan, India",
    "lat": 24.54205,
    "lng": 76.17242
  },
  {
    "name": "Jhalu, Uttar Pradesh, India",
    "lat": 29.33609,
    "lng": 78.22608
  },
  {
    "name": "Jhanjharpur, Bihar, India",
    "lat": 26.26467,
    "lng": 86.27993
  },
  {
    "name": "Jhansi, Uttar Pradesh, India",
    "lat": 25.5,
    "lng": 78.5
  },
  {
    "name": "Jhargram, West Bengal, India",
    "lat": 22.45,
    "lng": 86.98
  },
  {
    "name": "Jharia, Jharkhand, India",
    "lat": 23.74079,
    "lng": 86.41456
  },
  {
    "name": "Jharsuguda District, Odisha, India",
    "lat": 21.85,
    "lng": 84
  },
  {
    "name": "Jharsuguda, Odisha, India",
    "lat": 21.85531,
    "lng": 84.00698
  },
  {
    "name": "Jhilimili, West Bengal, India",
    "lat": 22.8167,
    "lng": 86.6167
  },
  {
    "name": "Jhinjhak, Uttar Pradesh, India",
    "lat": 26.56093,
    "lng": 79.73423
  },
  {
    "name": "Jhinjhana, Uttar Pradesh, India",
    "lat": 29.52118,
    "lng": 77.2247
  },
  {
    "name": "Jhulasan, Gujarat, India",
    "lat": 23.3286,
    "lng": 72.47314
  },
  {
    "name": "Jhunjhunun, Rajasthan, India",
    "lat": 28.12559,
    "lng": 75.39797
  },
  {
    "name": "Jhusi, Uttar Pradesh, India",
    "lat": 25.43745,
    "lng": 81.9055
  },
  {
    "name": "Jind, Haryana, India",
    "lat": 29.31577,
    "lng": 76.31502
  },
  {
    "name": "Jintur, Maharashtra, India",
    "lat": 19.61186,
    "lng": 76.6874
  },
  {
    "name": "Jiran, Madhya Pradesh, India",
    "lat": 24.30871,
    "lng": 74.89087
  },
  {
    "name": "Jiribam, Manipur, India",
    "lat": 24.7941004,
    "lng": 93.1170986
  },
  {
    "name": "Jiyanpur, Uttar Pradesh, India",
    "lat": 26.15,
    "lng": 83.33
  },
  {
    "name": "Jobat, Madhya Pradesh, India",
    "lat": 22.41599,
    "lng": 74.56828
  },
  {
    "name": "Jobner, Rajasthan, India",
    "lat": 26.97257,
    "lng": 75.38752
  },
  {
    "name": "Jodhpur (Ahmedabad), Gujarat, India",
    "lat": 21.88,
    "lng": 70.03
  },
  {
    "name": "Jodhpur, Gujarat, India",
    "lat": 21.90174,
    "lng": 70.0327
  },
  {
    "name": "Jodhpur, Rajasthan, India",
    "lat": 26.75,
    "lng": 72.75
  },
  {
    "name": "Jogbani, Bihar, India",
    "lat": 26.39905,
    "lng": 87.26525
  },
  {
    "name": "Jogeshwari, Maharashtra, India",
    "lat": 19.12,
    "lng": 72.85
  },
  {
    "name": "Jogighopa, Assam, India",
    "lat": 26.22646,
    "lng": 90.57247
  },
  {
    "name": "Jogindarnagar, Himachal Pradesh, India",
    "lat": 31.98727,
    "lng": 76.78906
  },
  {
    "name": "Jogulamba Gadwal, Telangana, India",
    "lat": 16.23401,
    "lng": 77.80564
  },
  {
    "name": "Johannesburg, South Africa",
    "lat": -26.2041,
    "lng": 28.0473
  },
  {
    "name": "Jorethang, Sikkim, India",
    "lat": 27.10696,
    "lng": 88.32332
  },
  {
    "name": "Jorhat, Assam, India",
    "lat": 26.8,
    "lng": 94.26
  },
  {
    "name": "Joshimath, Uttarakhand, India",
    "lat": 30.55543,
    "lng": 79.56436
  },
  {
    "name": "Jua, Goa, India",
    "lat": 15.5307,
    "lng": 73.95047
  },
  {
    "name": "Jubbal, Himachal Pradesh, India",
    "lat": 31.10923,
    "lng": 77.65085
  },
  {
    "name": "Jugsalai, Jharkhand, India",
    "lat": 22.77668,
    "lng": 86.18351
  },
  {
    "name": "Juhu, Maharashtra, India",
    "lat": 19.1070215,
    "lng": 72.8275275
  },
  {
    "name": "Jumri Tilaiya, Jharkhand, India",
    "lat": 24.4349,
    "lng": 85.52951
  },
  {
    "name": "Junagadh, Gujarat, India",
    "lat": 21.25,
    "lng": 70.33333
  },
  {
    "name": "Junagarh, Chhattisgarh, India",
    "lat": 19.85993,
    "lng": 82.93385
  },
  {
    "name": "Junnar, Maharashtra, India",
    "lat": 19.20815,
    "lng": 73.8752
  },
  {
    "name": "Jutogh, Himachal Pradesh, India",
    "lat": 31.1,
    "lng": 77.11667
  },
  {
    "name": "Jyotiba Phule Nagar, Uttar Pradesh, India",
    "lat": 28.7716,
    "lng": 78.33871
  },
  {
    "name": "Kabeerdham, Chhattisgarh, India",
    "lat": 22.1,
    "lng": 81.2
  },
  {
    "name": "Kabrai, Uttar Pradesh, India",
    "lat": 25.40281,
    "lng": 79.9997
  },
  {
    "name": "Kabul, Afghanistan",
    "lat": 34.5553,
    "lng": 69.2075
  },
  {
    "name": "Kachchh, Gujarat, India",
    "lat": 23.58333,
    "lng": 70
  },
  {
    "name": "Kachholi, Gujarat, India",
    "lat": 20.83333333,
    "lng": 72.96666667
  },
  {
    "name": "Kachhwa, Uttar Pradesh, India",
    "lat": 25.20615,
    "lng": 82.71442
  },
  {
    "name": "Kachurwahi, Maharashtra, India",
    "lat": 21.3333,
    "lng": 79.3833
  },
  {
    "name": "Kadakkavoor, Kerala, India",
    "lat": 8.67921,
    "lng": 76.76714
  },
  {
    "name": "Kadambur, Tamil Nadu, India",
    "lat": 8.99739,
    "lng": 77.86191
  },
  {
    "name": "Kadaura, Uttar Pradesh, India",
    "lat": 25.98537,
    "lng": 79.83842
  },
  {
    "name": "Kadayanallur, Tamil Nadu, India",
    "lat": 9.07277,
    "lng": 77.34152
  },
  {
    "name": "Kadegaon, Maharashtra, India",
    "lat": 17.3,
    "lng": 74.35
  },
  {
    "name": "Kadi, Gujarat, India",
    "lat": 23.29908,
    "lng": 72.33362
  },
  {
    "name": "Kadipur, Uttar Pradesh, India",
    "lat": 26.16779,
    "lng": 82.37028
  },
  {
    "name": "Kadiri, Andhra Pradesh, India",
    "lat": 14.11168,
    "lng": 78.15982
  },
  {
    "name": "Kadod, Gujarat, India",
    "lat": 21.21717,
    "lng": 73.21972
  },
  {
    "name": "Kadur, Karnataka, India",
    "lat": 13.55285,
    "lng": 76.01164
  },
  {
    "name": "Kadus, Maharashtra, India",
    "lat": 18.88333333,
    "lng": 73.81666667
  },
  {
    "name": "Kagal, Maharashtra, India",
    "lat": 16.57702,
    "lng": 74.31544
  },
  {
    "name": "Kagarol, Uttar Pradesh, India",
    "lat": 27.01666667,
    "lng": 77.85
  },
  {
    "name": "Kagaznagar, Telangana, India",
    "lat": 19.33159,
    "lng": 79.46605
  },
  {
    "name": "Kaij, Maharashtra, India",
    "lat": 18.7,
    "lng": 76.08333333
  },
  {
    "name": "Kaikalur, Andhra Pradesh, India",
    "lat": 16.55154,
    "lng": 81.214
  },
  {
    "name": "Kailaras, Madhya Pradesh, India",
    "lat": 26.30498,
    "lng": 77.616
  },
  {
    "name": "Kailashahar, Tripura, India",
    "lat": 24.33199,
    "lng": 92.00391
  },
  {
    "name": "Kaimganj, Uttar Pradesh, India",
    "lat": 27.55441,
    "lng": 79.33525
  },
  {
    "name": "Kaimori, Madhya Pradesh, India",
    "lat": 23.38465,
    "lng": 79.7442
  },
  {
    "name": "Kaimur, Bihar, India",
    "lat": 25.05077,
    "lng": 83.58261
  },
  {
    "name": "Kaintragarh, Odisha, India",
    "lat": 20.72115,
    "lng": 84.53514
  },
  {
    "name": "Kairana, Uttar Pradesh, India",
    "lat": 29.39541,
    "lng": 77.2054
  },
  {
    "name": "Kaithal, Haryana, India",
    "lat": 29.80153,
    "lng": 76.39959
  },
  {
    "name": "Kakching, Manipur, India",
    "lat": 24.4982,
    "lng": 93.98126
  },
  {
    "name": "Kakdwip, West Bengal, India",
    "lat": 21.8833,
    "lng": 88.1833
  },
  {
    "name": "Kakinada, Andhra Pradesh, India",
    "lat": 16.96036,
    "lng": 82.23809
  },
  {
    "name": "Kakori, Uttar Pradesh, India",
    "lat": 26.868,
    "lng": 80.7857
  },
  {
    "name": "Kakrala, Uttar Pradesh, India",
    "lat": 27.89269,
    "lng": 79.1945
  },
  {
    "name": "Kalaburgi, Karnataka, India",
    "lat": 17.16667,
    "lng": 77.08333
  },
  {
    "name": "Kaladhungi, Uttarakhand, India",
    "lat": 29.28351,
    "lng": 79.351
  },
  {
    "name": "Kalagarh Project Colony, Uttarakhand, India",
    "lat": 29.4778,
    "lng": 78.78449
  },
  {
    "name": "Kalahandi, Odisha, India",
    "lat": 19.75,
    "lng": 83
  },
  {
    "name": "Kalaikunda, West Bengal, India",
    "lat": 22.33916667,
    "lng": 87.22638889
  },
  {
    "name": "Kalakkadu, Tamil Nadu, India",
    "lat": 8.5138,
    "lng": 77.54944
  },
  {
    "name": "Kalamassery, Kerala, India",
    "lat": 10.0614,
    "lng": 76.32631
  },
  {
    "name": "Kalamb Osmanabad, Maharashtra, India",
    "lat": 18.57416667,
    "lng": 76.02166667
  },
  {
    "name": "Kalamb, Maharashtra, India",
    "lat": 19.04437,
    "lng": 73.95554
  },
  {
    "name": "Kalamboli, Maharashtra, India",
    "lat": 19.03333,
    "lng": 73.1
  },
  {
    "name": "Kalamnuri, Maharashtra, India",
    "lat": 19.67386,
    "lng": 77.31149
  },
  {
    "name": "Kalanaur, Haryana, India",
    "lat": 28.82823,
    "lng": 76.3955
  },
  {
    "name": "Kalanaur, Punjab, India",
    "lat": 32.01227,
    "lng": 75.15063
  },
  {
    "name": "Kalanwali, Haryana, India",
    "lat": 29.83573,
    "lng": 74.9717
  },
  {
    "name": "Kalas, Maharashtra, India",
    "lat": 18.17241,
    "lng": 74.79045
  },
  {
    "name": "Kalavad, Gujarat, India",
    "lat": 22.20789,
    "lng": 70.38343
  },
  {
    "name": "Kalavai, Tamil Nadu, India",
    "lat": 12.77029,
    "lng": 79.41999
  },
  {
    "name": "Kalavoor, Kerala, India",
    "lat": 9.57046,
    "lng": 76.32756
  },
  {
    "name": "Kalghatgi, Karnataka, India",
    "lat": 15.18315,
    "lng": 74.97099
  },
  {
    "name": "Kali(DK), Maharashtra, India",
    "lat": 19.938778,
    "lng": 77.732857
  },
  {
    "name": "Kaliaganj, West Bengal, India",
    "lat": 25.63,
    "lng": 88.32
  },
  {
    "name": "Kalikapur, Jharkhand, India",
    "lat": 22.61662,
    "lng": 86.2881
  },
  {
    "name": "Kalimpong, West Bengal, India",
    "lat": 27.07059,
    "lng": 88.47529
  },
  {
    "name": "Kalinagar, Uttar Pradesh, India",
    "lat": 28.62019,
    "lng": 80.08152
  },
  {
    "name": "Kalka, Himachal Pradesh, India",
    "lat": 30.83982,
    "lng": 76.94065
  },
  {
    "name": "Kallakkurichchi, Tamil Nadu, India",
    "lat": 11.7404,
    "lng": 78.959
  },
  {
    "name": "Kallidaikurichi, Tamil Nadu, India",
    "lat": 8.68591,
    "lng": 77.46592
  },
  {
    "name": "Kallupatti, Tamil Nadu, India",
    "lat": 9.71667,
    "lng": 77.86667
  },
  {
    "name": "Kalmeshwar, Maharashtra, India",
    "lat": 21.23219,
    "lng": 78.91988
  },
  {
    "name": "Kalna, West Bengal, India",
    "lat": 23.22,
    "lng": 88.37
  },
  {
    "name": "Kalol, Gujarat, India",
    "lat": 22.60777,
    "lng": 73.46272
  },
  {
    "name": "Kalpetta, Kerala, India",
    "lat": 11.60871,
    "lng": 76.08343
  },
  {
    "name": "Kalpi, Uttar Pradesh, India",
    "lat": 26.11667,
    "lng": 79.73333
  },
  {
    "name": "Kalugumalai, Tamil Nadu, India",
    "lat": 9.14941,
    "lng": 77.70569
  },
  {
    "name": "Kalundri, Maharashtra, India",
    "lat": 18.9802,
    "lng": 73.12708
  },
  {
    "name": "Kalyan, Maharashtra, India",
    "lat": 19.2437,
    "lng": 73.13554
  },
  {
    "name": "Kalyandurg, Andhra Pradesh, India",
    "lat": 14.54519,
    "lng": 77.10552
  },
  {
    "name": "Kalyani Nagar, Maharashtra, India",
    "lat": 18.5481,
    "lng": 73.9033
  },
  {
    "name": "Kalyani, West Bengal, India",
    "lat": 22.975,
    "lng": 88.43444444
  },
  {
    "name": "Kalyanpur, Uttar Pradesh, India",
    "lat": 26.51912222,
    "lng": 80.24980556
  },
  {
    "name": "Kamakhyanagar, Odisha, India",
    "lat": 20.93385,
    "lng": 85.54489
  },
  {
    "name": "Kamalapuram, Andhra Pradesh, India",
    "lat": 14.5983,
    "lng": 78.66948
  },
  {
    "name": "Kamalganj, Uttar Pradesh, India",
    "lat": 27.26181,
    "lng": 79.63134
  },
  {
    "name": "Kamalpur, Tripura, India",
    "lat": 24.19593,
    "lng": 91.83438
  },
  {
    "name": "Kaman, Rajasthan, India",
    "lat": 27.65791,
    "lng": 77.26908
  },
  {
    "name": "Kamareddi, Telangana, India",
    "lat": 18.32001,
    "lng": 78.34177
  },
  {
    "name": "Kamareddy, Telangana, India",
    "lat": 18.32567,
    "lng": 78.33416
  },
  {
    "name": "Kamargaon, Maharashtra, India",
    "lat": 20.61666667,
    "lng": 77.5
  },
  {
    "name": "Kamarhati, West Bengal, India",
    "lat": 22.67,
    "lng": 88.37
  },
  {
    "name": "Kamarpukur, West Bengal, India",
    "lat": 22.91,
    "lng": 87.65
  },
  {
    "name": "Kamatgi, Maharashtra, India",
    "lat": 16.119,
    "lng": 75.8482
  },
  {
    "name": "Kamjong, Manipur, India",
    "lat": 24.8599686,
    "lng": 94.5058643
  },
  {
    "name": "Kampil, Uttar Pradesh, India",
    "lat": 27.61268,
    "lng": 79.27687
  },
  {
    "name": "Kampli, Karnataka, India",
    "lat": 15.40626,
    "lng": 76.60013
  },
  {
    "name": "Kamptee, Maharashtra, India",
    "lat": 21.2333,
    "lng": 79.2
  },
  {
    "name": "Kamrup Metropolitan, Assam, India",
    "lat": 26.05375,
    "lng": 92.00763
  },
  {
    "name": "Kamrup, Assam, India",
    "lat": 26.22322,
    "lng": 91.65344
  },
  {
    "name": "Kamuthi, Tamil Nadu, India",
    "lat": 9.40732,
    "lng": 78.37337
  },
  {
    "name": "Kanadukattan, Tamil Nadu, India",
    "lat": 10.17209,
    "lng": 78.77935
  },
  {
    "name": "Kanakpura, Karnataka, India",
    "lat": 12.5454089,
    "lng": 77.4132286
  },
  {
    "name": "Kancheepuram, Tamil Nadu, India",
    "lat": 12.67,
    "lng": 79.99
  },
  {
    "name": "Kanchipuram, Tamil Nadu, India",
    "lat": 12.83515,
    "lng": 79.70006
  },
  {
    "name": "Kanchrapara, West Bengal, India",
    "lat": 22.97,
    "lng": 88.43
  },
  {
    "name": "Kandhamal, Odisha, India",
    "lat": 20.3,
    "lng": 84
  },
  {
    "name": "Kandhla, Uttar Pradesh, India",
    "lat": 29.32104,
    "lng": 77.27101
  },
  {
    "name": "Kandi, West Bengal, India",
    "lat": 23.95,
    "lng": 88.03
  },
  {
    "name": "Kandla port, Gujarat, India",
    "lat": 23.03,
    "lng": 70.22
  },
  {
    "name": "Kandla, Gujarat, India",
    "lat": 23.03333,
    "lng": 70.21667
  },
  {
    "name": "Kandra, Jharkhand, India",
    "lat": 22.8517,
    "lng": 86.05192
  },
  {
    "name": "Kandri, Maharashtra, India",
    "lat": 21.4203,
    "lng": 79.27663
  },
  {
    "name": "Kandukur, Andhra Pradesh, India",
    "lat": 15.21542,
    "lng": 79.9039
  },
  {
    "name": "Kangar, Himachal Pradesh, India",
    "lat": 32.09135,
    "lng": 76.26267
  },
  {
    "name": "Kangayam, Tamil Nadu, India",
    "lat": 11.00599,
    "lng": 77.5609
  },
  {
    "name": "Kangpokpi, Manipur, India",
    "lat": 24.0895,
    "lng": 93.9901
  },
  {
    "name": "Kangra, Himachal Pradesh, India",
    "lat": 32.16667,
    "lng": 76.25
  },
  {
    "name": "Kanhangad, Kerala, India",
    "lat": 12.30814,
    "lng": 75.10632
  },
  {
    "name": "Kanigiri, Andhra Pradesh, India",
    "lat": 15.40555,
    "lng": 79.50694
  },
  {
    "name": "Kanina Khas, Haryana, India",
    "lat": 28.33093,
    "lng": 76.31099
  },
  {
    "name": "Kankanhalli, Karnataka, India",
    "lat": 12.54654,
    "lng": 77.42005
  },
  {
    "name": "Kankauli, Maharashtra, India",
    "lat": 16.26609,
    "lng": 73.71217
  },
  {
    "name": "Kankavli, Maharashtra, India",
    "lat": 16.28551111,
    "lng": 73.68446111
  },
  {
    "name": "Kanke, Jharkhand, India",
    "lat": 23.43478,
    "lng": 85.32059
  },
  {
    "name": "Kanker, Chhattisgarh, India",
    "lat": 20.27193,
    "lng": 81.49177
  },
  {
    "name": "Kankipadu, Andhra Pradesh, India",
    "lat": 16.4353,
    "lng": 80.76715
  },
  {
    "name": "Kankon, Goa, India",
    "lat": 15.02698,
    "lng": 74.04617
  },
  {
    "name": "Kannad, Maharashtra, India",
    "lat": 20.25684,
    "lng": 75.13786
  },
  {
    "name": "Kannauj, Uttar Pradesh, India",
    "lat": 27.0177,
    "lng": 79.67846
  },
  {
    "name": "Kannavam, Kerala, India",
    "lat": 11.8445,
    "lng": 75.66266
  },
  {
    "name": "Kanniyakumari, Tamil Nadu, India",
    "lat": 8.32,
    "lng": 77.34
  },
  {
    "name": "Kannod, Madhya Pradesh, India",
    "lat": 22.66764,
    "lng": 76.74286
  },
  {
    "name": "Kannur, Kerala, India",
    "lat": 12.16667,
    "lng": 75.33333
  },
  {
    "name": "Kanodar, Gujarat, India",
    "lat": 24.08932,
    "lng": 72.39354
  },
  {
    "name": "Kanor, Rajasthan, India",
    "lat": 24.43437,
    "lng": 74.26546
  },
  {
    "name": "Kanpur Dehat, Uttar Pradesh, India",
    "lat": 26.41506,
    "lng": 79.98957
  },
  {
    "name": "Kanpur, Uttar Pradesh, India",
    "lat": 26.46523,
    "lng": 80.34975
  },
  {
    "name": "Kant, Uttar Pradesh, India",
    "lat": 27.81049,
    "lng": 79.79185
  },
  {
    "name": "Kantabanji, Odisha, India",
    "lat": 20.46709,
    "lng": 82.92042
  },
  {
    "name": "Kanth, Uttar Pradesh, India",
    "lat": 29.05939,
    "lng": 78.62951
  },
  {
    "name": "Kantilo, Odisha, India",
    "lat": 20.36152,
    "lng": 85.19212
  },
  {
    "name": "Kanuru, Andhra Pradesh, India",
    "lat": 16.28584,
    "lng": 81.25464
  },
  {
    "name": "Kapadvanj, Gujarat, India",
    "lat": 23.02302,
    "lng": 73.07113
  },
  {
    "name": "Kapren, Rajasthan, India",
    "lat": 25.40529,
    "lng": 76.07431
  },
  {
    "name": "Kaptanganj, Uttar Pradesh, India",
    "lat": 26.93,
    "lng": 83.72
  },
  {
    "name": "Kapurthala, Punjab, India",
    "lat": 31.38011,
    "lng": 75.38105
  },
  {
    "name": "Kara, Uttar Pradesh, India",
    "lat": 25.7,
    "lng": 81.35
  },
  {
    "name": "Karachi, Pakistan",
    "lat": 24.8607,
    "lng": 67.0011
  },
  {
    "name": "Karad, Maharashtra, India",
    "lat": 17.28937,
    "lng": 74.18183
  },
  {
    "name": "Karaikal, Puducherry, India",
    "lat": 10.92209,
    "lng": 79.83353
  },
  {
    "name": "Karaikkudi, Tamil Nadu, India",
    "lat": 10.06615,
    "lng": 78.76784
  },
  {
    "name": "Karajagi, Maharashtra, India",
    "lat": 17.11666667,
    "lng": 75.58333333
  },
  {
    "name": "Karamadai, Tamil Nadu, India",
    "lat": 11.24058,
    "lng": 76.96009
  },
  {
    "name": "Karambakkudi, Tamil Nadu, India",
    "lat": 10.45866,
    "lng": 79.14101
  },
  {
    "name": "Karamsad, Gujarat, India",
    "lat": 22.54243,
    "lng": 72.90392
  },
  {
    "name": "Karanja Lad, Maharashtra, India",
    "lat": 20.4833,
    "lng": 77.4833
  },
  {
    "name": "Karanja, Maharashtra, India",
    "lat": 20.48273,
    "lng": 77.48857
  },
  {
    "name": "Karanpur, Rajasthan, India",
    "lat": 29.84042,
    "lng": 73.45519
  },
  {
    "name": "Karari, Uttar Pradesh, India",
    "lat": 25.45241,
    "lng": 81.42675
  },
  {
    "name": "Karauli, Rajasthan, India",
    "lat": 26.58,
    "lng": 77.1
  },
  {
    "name": "Karbi Anglong, Assam, India",
    "lat": 26,
    "lng": 93.5
  },
  {
    "name": "Karbigwan, Uttar Pradesh, India",
    "lat": 26.2,
    "lng": 80.5
  },
  {
    "name": "Karchana, Uttar Pradesh, India",
    "lat": 25.28,
    "lng": 81.93
  },
  {
    "name": "Kareli, Madhya Pradesh, India",
    "lat": 22.91533,
    "lng": 79.06378
  },
  {
    "name": "Karera, Madhya Pradesh, India",
    "lat": 25.45815,
    "lng": 78.13583
  },
  {
    "name": "Kargil, Ladakh, India",
    "lat": 34.55765,
    "lng": 76.12622
  },
  {
    "name": "Karhal, Uttar Pradesh, India",
    "lat": 27.00089,
    "lng": 78.93935
  },
  {
    "name": "Kariana, Gujarat, India",
    "lat": 21.88333333,
    "lng": 71.35
  },
  {
    "name": "Kariapatti, Tamil Nadu, India",
    "lat": 9.67505,
    "lng": 78.09992
  },
  {
    "name": "Karimganj, Assam, India",
    "lat": 24.6,
    "lng": 92.4
  },
  {
    "name": "Karimnagar, Telangana, India",
    "lat": 18.33844,
    "lng": 79.22938
  },
  {
    "name": "Karimpur, West Bengal, India",
    "lat": 23.96666667,
    "lng": 88.61666667
  },
  {
    "name": "Karjan, Gujarat, India",
    "lat": 22.05304167,
    "lng": 73.12351389
  },
  {
    "name": "Karjat, Maharashtra, India",
    "lat": 18.9107,
    "lng": 73.32354
  },
  {
    "name": "Karkala, Karnataka, India",
    "lat": 13.21428,
    "lng": 74.99234
  },
  {
    "name": "Karkamb, Maharashtra, India",
    "lat": 17.8653,
    "lng": 75.2964
  },
  {
    "name": "Karmala, Maharashtra, India",
    "lat": 18.4077,
    "lng": 75.19386
  },
  {
    "name": "Karnal, Haryana, India",
    "lat": 29.66667,
    "lng": 76.83333
  },
  {
    "name": "Karol Bagh, Delhi, India",
    "lat": 28.65136,
    "lng": 77.19072
  },
  {
    "name": "Karrapur, Madhya Pradesh, India",
    "lat": 23.94891,
    "lng": 78.86584
  },
  {
    "name": "Kartarpur, Punjab, India",
    "lat": 31.44268,
    "lng": 75.49847
  },
  {
    "name": "Karumbakkam, Tamil Nadu, India",
    "lat": 12.70203,
    "lng": 80.0911
  },
  {
    "name": "Karur, Tamil Nadu, India",
    "lat": 10.95771,
    "lng": 78.08095
  },
  {
    "name": "Karwar, Karnataka, India",
    "lat": 14.81361,
    "lng": 74.12972
  },
  {
    "name": "Kasara, Maharashtra, India",
    "lat": 19.6333,
    "lng": 73.4833
  },
  {
    "name": "Kasaragod, Kerala, India",
    "lat": 12.49838,
    "lng": 74.98959
  },
  {
    "name": "Kasauli, Himachal Pradesh, India",
    "lat": 30.89856,
    "lng": 76.96587
  },
  {
    "name": "Kasba, Bihar, India",
    "lat": 25.85643,
    "lng": 87.53836
  },
  {
    "name": "Kasganj, Uttar Pradesh, India",
    "lat": 27.80882,
    "lng": 78.64579
  },
  {
    "name": "Kashipur, Uttarakhand, India",
    "lat": 29.21399,
    "lng": 78.95693
  },
  {
    "name": "Kasoda, Maharashtra, India",
    "lat": 20.81666667,
    "lng": 75.3
  },
  {
    "name": "Kasrawad, Madhya Pradesh, India",
    "lat": 22.12745,
    "lng": 75.61101
  },
  {
    "name": "Katangi, Madhya Pradesh, India",
    "lat": 21.77369,
    "lng": 79.80513
  },
  {
    "name": "Katghora, Chhattisgarh, India",
    "lat": 22.50247,
    "lng": 82.54279
  },
  {
    "name": "Kathmandu, Nepal",
    "lat": 27.7172,
    "lng": 85.324
  },
  {
    "name": "Kathor, Gujarat, India",
    "lat": 21.28854,
    "lng": 72.9407
  },
  {
    "name": "Kathua, Jammu and Kashmir, India",
    "lat": 32.58333,
    "lng": 75.5
  },
  {
    "name": "Kati, Maharashtra, India",
    "lat": 17.96137,
    "lng": 75.88895
  },
  {
    "name": "Katihar, Bihar, India",
    "lat": 25.5,
    "lng": 87.6
  },
  {
    "name": "Katni, Madhya Pradesh, India",
    "lat": 23.83555,
    "lng": 80.39417
  },
  {
    "name": "Katol, Maharashtra, India",
    "lat": 21.27388,
    "lng": 78.5858
  },
  {
    "name": "Katpadi, Tamil Nadu, India",
    "lat": 12.96951,
    "lng": 79.14552
  },
  {
    "name": "Katpur, Gujarat, India",
    "lat": 21.05869,
    "lng": 71.79457
  },
  {
    "name": "Katra, Jammu and Kashmir, India",
    "lat": 32.99167,
    "lng": 74.93195
  },
  {
    "name": "Katra, Uttar Pradesh, India",
    "lat": 27.50871,
    "lng": 82.02636
  },
  {
    "name": "Katral, Maharashtra, India",
    "lat": 17.16666667,
    "lng": 75.63333333
  },
  {
    "name": "Katras, Jharkhand, India",
    "lat": 23.79752,
    "lng": 86.29834
  },
  {
    "name": "Kattanam, Kerala, India",
    "lat": 9.17614,
    "lng": 76.56325
  },
  {
    "name": "Kattivakkam, Tamil Nadu, India",
    "lat": 13.21667,
    "lng": 80.31667
  },
  {
    "name": "Kattupputtur, Tamil Nadu, India",
    "lat": 10.99385,
    "lng": 78.21929
  },
  {
    "name": "Katwa, West Bengal, India",
    "lat": 23.65,
    "lng": 88.13
  },
  {
    "name": "Kausani, Uttar Pradesh, India",
    "lat": 29.84305556,
    "lng": 79.60333333
  },
  {
    "name": "Kaushambi, Uttar Pradesh, India",
    "lat": 25.53074,
    "lng": 81.37729
  },
  {
    "name": "Kavali, Andhra Pradesh, India",
    "lat": 14.9163,
    "lng": 79.99449
  },
  {
    "name": "Kavalur, Karnataka, India",
    "lat": 15.28829,
    "lng": 75.9433
  },
  {
    "name": "Kavaratti, Lakshadweep, India",
    "lat": 10.56688,
    "lng": 72.64203
  },
  {
    "name": "Kaveripatnam, Tamil Nadu, India",
    "lat": 12.42186,
    "lng": 78.2188
  },
  {
    "name": "Kawant, Gujarat, India",
    "lat": 22.09282,
    "lng": 74.05078
  },
  {
    "name": "Kawardha, Chhattisgarh, India",
    "lat": 22.00853,
    "lng": 81.23148
  },
  {
    "name": "Kayalpattinam, Tamil Nadu, India",
    "lat": 8.57143,
    "lng": 78.11992
  },
  {
    "name": "Kayankulam, Kerala, India",
    "lat": 9.18173,
    "lng": 76.50093
  },
  {
    "name": "Kayattar, Tamil Nadu, India",
    "lat": 8.94834,
    "lng": 77.77424
  },
  {
    "name": "Kayavarohan, Gujarat, India",
    "lat": 22.067,
    "lng": 73.25
  },
  {
    "name": "Keelakarai, Tamil Nadu, India",
    "lat": 9.23183,
    "lng": 78.78545
  },
  {
    "name": "Kekri, Rajasthan, India",
    "lat": 25.97132,
    "lng": 75.14992
  },
  {
    "name": "Kelamangalam, Tamil Nadu, India",
    "lat": 12.60307,
    "lng": 77.85193
  },
  {
    "name": "Kemri, Uttar Pradesh, India",
    "lat": 28.80673,
    "lng": 79.2048
  },
  {
    "name": "Kenda, West Bengal, India",
    "lat": 23.2,
    "lng": 86.53
  },
  {
    "name": "Kendrapara, Odisha, India",
    "lat": 20.5,
    "lng": 86.5
  },
  {
    "name": "Kenduadih, Jharkhand, India",
    "lat": 23.77574,
    "lng": 86.37609
  },
  {
    "name": "Kendujhar, Odisha, India",
    "lat": 21.5,
    "lng": 85.5
  },
  {
    "name": "Kerur, Karnataka, India",
    "lat": 16.01384,
    "lng": 75.54631
  },
  {
    "name": "Kerwada, Gujarat, India",
    "lat": 21.9,
    "lng": 72.85
  },
  {
    "name": "Keshabpur, West Bengal, India",
    "lat": 22.97,
    "lng": 88.26
  },
  {
    "name": "Keshod, Gujarat, India",
    "lat": 21.30328,
    "lng": 70.24861
  },
  {
    "name": "Keshorai Patan, Rajasthan, India",
    "lat": 25.29275,
    "lng": 75.93948
  },
  {
    "name": "Kesinga, Odisha, India",
    "lat": 20.18778,
    "lng": 83.21949
  },
  {
    "name": "Khachrod, Madhya Pradesh, India",
    "lat": 23.42322,
    "lng": 75.28185
  },
  {
    "name": "Khada, Uttar Pradesh, India",
    "lat": 27.18333,
    "lng": 83.88333
  },
  {
    "name": "Khadki, Maharashtra, India",
    "lat": 18.5635,
    "lng": 73.85205
  },
  {
    "name": "Khaga, Uttar Pradesh, India",
    "lat": 25.77215,
    "lng": 81.10393
  },
  {
    "name": "Khagaria, Bihar, India",
    "lat": 25.5022,
    "lng": 86.46708
  },
  {
    "name": "Khagaul, Bihar, India",
    "lat": 25.57898,
    "lng": 85.04564
  },
  {
    "name": "Khailar, Madhya Pradesh, India",
    "lat": 25.34127,
    "lng": 78.53133
  },
  {
    "name": "Khailar, Uttar Pradesh, India",
    "lat": 25.35,
    "lng": 78.53
  },
  {
    "name": "Khair, Uttar Pradesh, India",
    "lat": 27.94195,
    "lng": 77.84243
  },
  {
    "name": "Khairabad, Uttar Pradesh, India",
    "lat": 27.52698,
    "lng": 80.75461
  },
  {
    "name": "Khairagarh, Chhattisgarh, India",
    "lat": 21.41859,
    "lng": 80.97942
  },
  {
    "name": "Khajuraho Group of Monuments, Madhya Pradesh, India",
    "lat": 24.84809,
    "lng": 79.93351
  },
  {
    "name": "Khalapur, Maharashtra, India",
    "lat": 18.81666667,
    "lng": 73.26666667
  },
  {
    "name": "Khalilabad, Uttar Pradesh, India",
    "lat": 26.77268,
    "lng": 83.07179
  },
  {
    "name": "Khallar, Maharashtra, India",
    "lat": 21.0402869,
    "lng": 77.4656296
  },
  {
    "name": "Khallikot, Odisha, India",
    "lat": 19.60908,
    "lng": 85.08609
  },
  {
    "name": "Khamanon, Punjab, India",
    "lat": 30.81725,
    "lng": 76.35478
  },
  {
    "name": "Khamaria, Madhya Pradesh, India",
    "lat": 23.22558,
    "lng": 79.88007
  },
  {
    "name": "Khambhalia, Gujarat, India",
    "lat": 22.2,
    "lng": 69.65
  },
  {
    "name": "Khambhat, Gujarat, India",
    "lat": 22.31744,
    "lng": 72.61916
  },
  {
    "name": "Khamgaon, Maharashtra, India",
    "lat": 20.70738,
    "lng": 76.56827
  },
  {
    "name": "Khamharia, Chhattisgarh, India",
    "lat": 20.976,
    "lng": 82.25116
  },
  {
    "name": "Khammam, Telangana, India",
    "lat": 17.5,
    "lng": 80.33333
  },
  {
    "name": "Khanapur, Karnataka, India",
    "lat": 15.63969,
    "lng": 74.50847
  },
  {
    "name": "Khanapur, Maharashtra, India",
    "lat": 17.26111111,
    "lng": 74.70166667
  },
  {
    "name": "Khandala, Maharashtra, India",
    "lat": 18.05918056,
    "lng": 74.01262778
  },
  {
    "name": "Khandela, Rajasthan, India",
    "lat": 27.60499,
    "lng": 75.502
  },
  {
    "name": "Khandwa, Madhya Pradesh, India",
    "lat": 21.82427,
    "lng": 76.35086
  },
  {
    "name": "Khangaon, Maharashtra, India",
    "lat": 20.5,
    "lng": 78.61666667
  },
  {
    "name": "Khanna, Punjab, India",
    "lat": 30.70547,
    "lng": 76.22196
  },
  {
    "name": "Khanpur, Rajasthan, India",
    "lat": 24.73241,
    "lng": 76.39601
  },
  {
    "name": "Khanpur, Uttar Pradesh, India",
    "lat": 28.53446,
    "lng": 78.06546
  },
  {
    "name": "Khapa, Maharashtra, India",
    "lat": 21.42243,
    "lng": 78.98168
  },
  {
    "name": "Kharagpur, Bihar, India",
    "lat": 25.12446,
    "lng": 86.55578
  },
  {
    "name": "Kharagpur, West Bengal, India",
    "lat": 22.330239,
    "lng": 87.323653
  },
  {
    "name": "Kharakvasla, Maharashtra, India",
    "lat": 18.43997,
    "lng": 73.77545
  },
  {
    "name": "Kharar, Punjab, India",
    "lat": 30.74632,
    "lng": 76.64689
  },
  {
    "name": "Kharar, West Bengal, India",
    "lat": 22.7,
    "lng": 87.68
  },
  {
    "name": "Kharba, West Bengal, India",
    "lat": 25.42,
    "lng": 88.07
  },
  {
    "name": "Kharda, Maharashtra, India",
    "lat": 18.63753,
    "lng": 75.47513
  },
  {
    "name": "Khardaha, West Bengal, India",
    "lat": 22.72,
    "lng": 88.38
  },
  {
    "name": "Kharela, Uttar Pradesh, India",
    "lat": 25.54277,
    "lng": 79.81235
  },
  {
    "name": "Khargapur, Madhya Pradesh, India",
    "lat": 24.823,
    "lng": 79.144
  },
  {
    "name": "Kharghar, Maharashtra, India",
    "lat": 19.03614722,
    "lng": 73.06172222
  },
  {
    "name": "Khargone, Madhya Pradesh, India",
    "lat": 21.82306,
    "lng": 75.61028
  },
  {
    "name": "Khargupur, Uttar Pradesh, India",
    "lat": 27.37611,
    "lng": 81.9882
  },
  {
    "name": "Kharhial, Odisha, India",
    "lat": 20.28845,
    "lng": 82.7606
  },
  {
    "name": "Kharkhauda, Haryana, India",
    "lat": 28.8787,
    "lng": 76.91069
  },
  {
    "name": "Kharkhauda, Uttar Pradesh, India",
    "lat": 28.83644,
    "lng": 77.74159
  },
  {
    "name": "Kharod, Chhattisgarh, India",
    "lat": 21.7442,
    "lng": 82.5788
  },
  {
    "name": "Kharsawan, Jharkhand, India",
    "lat": 22.79093,
    "lng": 85.83102
  },
  {
    "name": "Kharsia, Chhattisgarh, India",
    "lat": 21.98953,
    "lng": 83.10476
  },
  {
    "name": "Kharsundi, Maharashtra, India",
    "lat": 17.341585,
    "lng": 74.775996
  },
  {
    "name": "Kharupatia, Assam, India",
    "lat": 26.51839,
    "lng": 92.14722
  },
  {
    "name": "Khatauli, Uttar Pradesh, India",
    "lat": 29.27844,
    "lng": 77.73302
  },
  {
    "name": "Khategaon, Madhya Pradesh, India",
    "lat": 22.59573,
    "lng": 76.9133
  },
  {
    "name": "Khatima, Uttarakhand, India",
    "lat": 28.92134,
    "lng": 79.97075
  },
  {
    "name": "Khatra, West Bengal, India",
    "lat": 22.98,
    "lng": 86.85
  },
  {
    "name": "Khaur, Jammu and Kashmir, India",
    "lat": 32.6027,
    "lng": 74.80918
  },
  {
    "name": "Khavda, Gujarat, India",
    "lat": 23.85,
    "lng": 69.72
  },
  {
    "name": "Khawhai, Mizoram, India",
    "lat": 23.37807,
    "lng": 93.12797
  },
  {
    "name": "Khed, Maharashtra, India",
    "lat": 17.71888,
    "lng": 73.39693
  },
  {
    "name": "Kheda, Gujarat, India",
    "lat": 22.75,
    "lng": 72.83333
  },
  {
    "name": "Khedbrahma, Gujarat, India",
    "lat": 24.0299,
    "lng": 73.04632
  },
  {
    "name": "Khedoi, Gujarat, India",
    "lat": 23.05927778,
    "lng": 69.91895556
  },
  {
    "name": "Khekra, Uttar Pradesh, India",
    "lat": 28.86586,
    "lng": 77.2841
  },
  {
    "name": "Khemkaran, Punjab, India",
    "lat": 31.14443,
    "lng": 74.55938
  },
  {
    "name": "Kherali, Gujarat, India",
    "lat": 22.68333333,
    "lng": 71.6
  },
  {
    "name": "Kheralu, Gujarat, India",
    "lat": 23.88534,
    "lng": 72.61869
  },
  {
    "name": "Kheri Sampla, Haryana, India",
    "lat": 28.7781,
    "lng": 76.7756
  },
  {
    "name": "Kheri, Uttar Pradesh, India",
    "lat": 28.11667,
    "lng": 80.71667
  },
  {
    "name": "Khetia, Maharashtra, India",
    "lat": 21.67124,
    "lng": 74.58535
  },
  {
    "name": "Khetri, Rajasthan, India",
    "lat": 28.00069,
    "lng": 75.78644
  },
  {
    "name": "Khilchipur, Madhya Pradesh, India",
    "lat": 24.03943,
    "lng": 76.578
  },
  {
    "name": "Khirkiyan, Madhya Pradesh, India",
    "lat": 22.16732,
    "lng": 76.86137
  },
  {
    "name": "Khoni, Maharashtra, India",
    "lat": 19.3113,
    "lng": 73.0544
  },
  {
    "name": "Khonsa, Arunachal Pradesh, India",
    "lat": 27.01667,
    "lng": 95.56667
  },
  {
    "name": "Khopoli, Maharashtra, India",
    "lat": 18.78562,
    "lng": 73.34589
  },
  {
    "name": "Khordha, Odisha, India",
    "lat": 20.2,
    "lng": 85.6
  },
  {
    "name": "Khowai, Tripura, India",
    "lat": 24.07964,
    "lng": 91.59972
  },
  {
    "name": "Khudaganj, Uttar Pradesh, India",
    "lat": 28.14607,
    "lng": 79.71472
  },
  {
    "name": "Khujner, Madhya Pradesh, India",
    "lat": 23.78597,
    "lng": 76.61773
  },
  {
    "name": "Khuldabad, Maharashtra, India",
    "lat": 20.00671,
    "lng": 75.19245
  },
  {
    "name": "Khunti, Jharkhand, India",
    "lat": 23.07602,
    "lng": 85.27818
  },
  {
    "name": "Khurai, Madhya Pradesh, India",
    "lat": 24.04372,
    "lng": 78.33014
  },
  {
    "name": "Khurda, Odisha, India",
    "lat": 20.18268,
    "lng": 85.61629
  },
  {
    "name": "Khurja, Uttar Pradesh, India",
    "lat": 28.25382,
    "lng": 77.85535
  },
  {
    "name": "Khusropur, Bihar, India",
    "lat": 25.48174,
    "lng": 85.38492
  },
  {
    "name": "Khutar, Uttar Pradesh, India",
    "lat": 28.20307,
    "lng": 80.27046
  },
  {
    "name": "Kichha, Uttarakhand, India",
    "lat": 28.91154,
    "lng": 79.52009
  },
  {
    "name": "Kil Bhuvanagiri, Tamil Nadu, India",
    "lat": 11.44216,
    "lng": 79.64763
  },
  {
    "name": "Kilvelur, Tamil Nadu, India",
    "lat": 10.76721,
    "lng": 79.74186
  },
  {
    "name": "Kinnaur, Himachal Pradesh, India",
    "lat": 31.58333,
    "lng": 78.41667
  },
  {
    "name": "Kinwat, Maharashtra, India",
    "lat": 19.62557,
    "lng": 78.1987
  },
  {
    "name": "Kirakat, Uttar Pradesh, India",
    "lat": 25.63745,
    "lng": 82.91596
  },
  {
    "name": "Kirandul, Chhattisgarh, India",
    "lat": 18.63649,
    "lng": 81.25827
  },
  {
    "name": "Kiranur, Tamil Nadu, India",
    "lat": 10.56988,
    "lng": 78.78682
  },
  {
    "name": "Kiraoli, Uttar Pradesh, India",
    "lat": 27.13768,
    "lng": 77.78516
  },
  {
    "name": "Kiratpur, Uttar Pradesh, India",
    "lat": 29.50671,
    "lng": 78.20613
  },
  {
    "name": "Kiri Buru, Odisha, India",
    "lat": 22.08333,
    "lng": 85.35
  },
  {
    "name": "Kirnahar, West Bengal, India",
    "lat": 23.75,
    "lng": 87.87
  },
  {
    "name": "Kishanganj, Bihar, India",
    "lat": 26.3,
    "lng": 88
  },
  {
    "name": "Kishangarh, Rajasthan, India",
    "lat": 26.59006,
    "lng": 74.85397
  },
  {
    "name": "Kishanpur baral, Uttar Pradesh, India",
    "lat": 29.2,
    "lng": 77.28333333
  },
  {
    "name": "Kishanpur, Uttar Pradesh, India",
    "lat": 25.64232,
    "lng": 81.0227
  },
  {
    "name": "Kishni, Uttar Pradesh, India",
    "lat": 27.02487,
    "lng": 79.262
  },
  {
    "name": "Kishtwar, Jammu and Kashmir, India",
    "lat": 33.52958,
    "lng": 76.01462
  },
  {
    "name": "Kithor, Uttar Pradesh, India",
    "lat": 28.86684,
    "lng": 77.93861
  },
  {
    "name": "Kizhake Chalakudi, Kerala, India",
    "lat": 10.30067,
    "lng": 76.33763
  },
  {
    "name": "Koath, Bihar, India",
    "lat": 25.32643,
    "lng": 84.25983
  },
  {
    "name": "Kodagu, Karnataka, India",
    "lat": 12.41667,
    "lng": 75.75
  },
  {
    "name": "Kodaikanal, Tamil Nadu, India",
    "lat": 10.23925,
    "lng": 77.48932
  },
  {
    "name": "Kodala, Odisha, India",
    "lat": 19.62425,
    "lng": 84.94075
  },
  {
    "name": "Kodar, Telangana, India",
    "lat": 16.9985,
    "lng": 79.9656
  },
  {
    "name": "Kodarma, Jharkhand, India",
    "lat": 24.46753,
    "lng": 85.59397
  },
  {
    "name": "Kodigenahalli, Karnataka, India",
    "lat": 13.72136,
    "lng": 77.38629
  },
  {
    "name": "Kodinar, Gujarat, India",
    "lat": 20.79393,
    "lng": 70.70216
  },
  {
    "name": "Kodlipet, Karnataka, India",
    "lat": 12.80087,
    "lng": 75.88662
  },
  {
    "name": "Kodoli, Maharashtra, India",
    "lat": 16.87639,
    "lng": 74.1909
  },
  {
    "name": "Kodumudi, Tamil Nadu, India",
    "lat": 11.07751,
    "lng": 77.88363
  },
  {
    "name": "Kodungallur, Kerala, India",
    "lat": 10.23263,
    "lng": 76.19513
  },
  {
    "name": "Koelwar, Bihar, India",
    "lat": 25.58055,
    "lng": 84.79751
  },
  {
    "name": "Kohima, Nagaland, India",
    "lat": 25.67467,
    "lng": 94.11099
  },
  {
    "name": "Kokrajhar, Assam, India",
    "lat": 26.6,
    "lng": 90.2
  },
  {
    "name": "Kolanukonda, Andhra Pradesh, India",
    "lat": 16.45392,
    "lng": 80.61046
  },
  {
    "name": "Kolar, Karnataka, India",
    "lat": 13.13,
    "lng": 78.23
  },
  {
    "name": "Kolaras, Madhya Pradesh, India",
    "lat": 25.21928,
    "lng": 77.61167
  },
  {
    "name": "Kolasib, Mizoram, India",
    "lat": 24.22388,
    "lng": 92.67869
  },
  {
    "name": "Kolhapur, Maharashtra, India",
    "lat": 16.69013,
    "lng": 74.22981
  },
  {
    "name": "Kolkata, West Bengal, India",
    "lat": 22.54111111,
    "lng": 88.33777778
  },
  {
    "name": "Kollam, Kerala, India",
    "lat": 8.88113,
    "lng": 76.58469
  },
  {
    "name": "Kollegal, Karnataka, India",
    "lat": 12.15449,
    "lng": 77.11051
  },
  {
    "name": "Kombai, Tamil Nadu, India",
    "lat": 9.84745,
    "lng": 77.29603
  },
  {
    "name": "Konanur, Karnataka, India",
    "lat": 12.63016,
    "lng": 76.05037
  },
  {
    "name": "Konarka, Odisha, India",
    "lat": 19.89758,
    "lng": 86.11413
  },
  {
    "name": "Konch, Uttar Pradesh, India",
    "lat": 25.99451,
    "lng": 79.15127
  },
  {
    "name": "Kondagaon, Chhattisgarh, India",
    "lat": 19.59083,
    "lng": 81.664
  },
  {
    "name": "Kondalwadi, Maharashtra, India",
    "lat": 18.80727,
    "lng": 77.77031
  },
  {
    "name": "Kondapalle, Andhra Pradesh, India",
    "lat": 16.61989,
    "lng": 80.54244
  },
  {
    "name": "Kondhali, Maharashtra, India",
    "lat": 21.15,
    "lng": 78.61666667
  },
  {
    "name": "Konganapuram, Tamil Nadu, India",
    "lat": 11.57105,
    "lng": 77.9004
  },
  {
    "name": "Konnagar, West Bengal, India",
    "lat": 22.7,
    "lng": 88.35
  },
  {
    "name": "Konnur, Karnataka, India",
    "lat": 16.20138,
    "lng": 74.74886
  },
  {
    "name": "Koothanallur, Tamil Nadu, India",
    "lat": 10.7199,
    "lng": 79.5157
  },
  {
    "name": "Kopaganj, Uttar Pradesh, India",
    "lat": 26.01923,
    "lng": 83.5663
  },
  {
    "name": "Kopar Khairane, Maharashtra, India",
    "lat": 19.10305556,
    "lng": 73.01055556
  },
  {
    "name": "Kopargaon, Maharashtra, India",
    "lat": 19.88239,
    "lng": 74.47605
  },
  {
    "name": "Kopela, Maharashtra, India",
    "lat": 18.83,
    "lng": 80.23
  },
  {
    "name": "Koppa, Karnataka, India",
    "lat": 13.53044,
    "lng": 75.36329
  },
  {
    "name": "Koppal, Karnataka, India",
    "lat": 15.5,
    "lng": 76.2
  },
  {
    "name": "Koradachcheri, Tamil Nadu, India",
    "lat": 10.77019,
    "lng": 79.49158
  },
  {
    "name": "Koradi, Maharashtra, India",
    "lat": 21.24758,
    "lng": 79.10575
  },
  {
    "name": "Korampallam, Tamil Nadu, India",
    "lat": 8.77506,
    "lng": 78.09158
  },
  {
    "name": "Koraput, Odisha, India",
    "lat": 19,
    "lng": 83
  },
  {
    "name": "Koratagere, Karnataka, India",
    "lat": 13.522,
    "lng": 77.2373
  },
  {
    "name": "Koratla, Telangana, India",
    "lat": 18.82154,
    "lng": 78.71186
  },
  {
    "name": "Korba, Chhattisgarh, India",
    "lat": 22.5,
    "lng": 82.6
  },
  {
    "name": "Koregaon, Maharashtra, India",
    "lat": 18.64573,
    "lng": 74.05909
  },
  {
    "name": "Koria, Chhattisgarh, India",
    "lat": 23.48326,
    "lng": 82.15037
  },
  {
    "name": "Korukollu, Andhra Pradesh, India",
    "lat": 16.5,
    "lng": 81.25
  },
  {
    "name": "Korwai, Madhya Pradesh, India",
    "lat": 24.11774,
    "lng": 78.04007
  },
  {
    "name": "Kosamba, Gujarat, India",
    "lat": 21.46202,
    "lng": 72.95842
  },
  {
    "name": "Kosi, Uttar Pradesh, India",
    "lat": 27.79449,
    "lng": 77.4368
  },
  {
    "name": "Kosigi, Andhra Pradesh, India",
    "lat": 15.8551,
    "lng": 77.24463
  },
  {
    "name": "Kot Isa Khan, Punjab, India",
    "lat": 30.94659,
    "lng": 75.1378
  },
  {
    "name": "Kota, Chhattisgarh, India",
    "lat": 22.29507,
    "lng": 82.02366
  },
  {
    "name": "Kota, Rajasthan, India",
    "lat": 25.17512,
    "lng": 75.84412
  },
  {
    "name": "Kota, Uttar Pradesh, India",
    "lat": 24.44643,
    "lng": 83.13063
  },
  {
    "name": "Kotagiri, Tamil Nadu, India",
    "lat": 11.42072,
    "lng": 76.86035
  },
  {
    "name": "Kotamangalam, Kerala, India",
    "lat": 10.06435,
    "lng": 76.62843
  },
  {
    "name": "Kotaparh, Chhattisgarh, India",
    "lat": 19.14256,
    "lng": 82.32536
  },
  {
    "name": "Kotar, Madhya Pradesh, India",
    "lat": 24.69802,
    "lng": 80.98073
  },
  {
    "name": "Kotdwara, Uttarakhand, India",
    "lat": 29.74612,
    "lng": 78.52219
  },
  {
    "name": "Kothapet, Telangana, India",
    "lat": 19.35176,
    "lng": 79.48323
  },
  {
    "name": "Kothara, Gujarat, India",
    "lat": 23.133,
    "lng": 68.932
  },
  {
    "name": "Kotharia, Gujarat, India",
    "lat": 22.23,
    "lng": 70.81
  },
  {
    "name": "Kothi, Madhya Pradesh, India",
    "lat": 24.7526,
    "lng": 80.77751
  },
  {
    "name": "Kotkapura, Punjab, India",
    "lat": 30.5819,
    "lng": 74.83298
  },
  {
    "name": "Kotkhai, Himachal Pradesh, India",
    "lat": 31.11728,
    "lng": 77.53936
  },
  {
    "name": "Kotla, Himachal Pradesh, India",
    "lat": 32.25,
    "lng": 76.03333
  },
  {
    "name": "Kotma, Madhya Pradesh, India",
    "lat": 23.20383,
    "lng": 81.97904
  },
  {
    "name": "Kotputli, Rajasthan, India",
    "lat": 27.70207,
    "lng": 76.19911
  },
  {
    "name": "Kotra, Uttar Pradesh, India",
    "lat": 25.8077,
    "lng": 79.30909
  },
  {
    "name": "Kottagudem, Telangana, India",
    "lat": 17.55106,
    "lng": 80.61779
  },
  {
    "name": "Kottaiyur, Tamil Nadu, India",
    "lat": 10.10956,
    "lng": 78.7956
  },
  {
    "name": "Kottapalli, Telangana, India",
    "lat": 18.49543,
    "lng": 79.0943
  },
  {
    "name": "Kottayam, Kerala, India",
    "lat": 9.66667,
    "lng": 76.66667
  },
  {
    "name": "Kotturu, Karnataka, India",
    "lat": 14.82442,
    "lng": 76.22005
  },
  {
    "name": "Kotwa, Madhya Pradesh, India",
    "lat": 25.0308,
    "lng": 81.31908
  },
  {
    "name": "Kovalam, Kerala, India",
    "lat": 8.36667,
    "lng": 76.99667
  },
  {
    "name": "Kovilpatti, Tamil Nadu, India",
    "lat": 9.17167,
    "lng": 77.86989
  },
  {
    "name": "Kovvur, Andhra Pradesh, India",
    "lat": 17.0162,
    "lng": 81.72934
  },
  {
    "name": "Koynanagar, Maharashtra, India",
    "lat": 17.4,
    "lng": 73.76667
  },
  {
    "name": "Kozhikode, Kerala, India",
    "lat": 11.5,
    "lng": 76
  },
  {
    "name": "Krishna, Andhra Pradesh, India",
    "lat": 16.66667,
    "lng": 81
  },
  {
    "name": "Krishnagiri, Tamil Nadu, India",
    "lat": 12.58,
    "lng": 77.96
  },
  {
    "name": "Krishnanagar, West Bengal, India",
    "lat": 23.4058481,
    "lng": 88.4958935
  },
  {
    "name": "Krishnapur, West Bengal, India",
    "lat": 22.67,
    "lng": 88.26
  },
  {
    "name": "Krishnarajpet, Karnataka, India",
    "lat": 12.66621,
    "lng": 76.4877
  },
  {
    "name": "Kshirpai, West Bengal, India",
    "lat": 22.7109664,
    "lng": 87.6174038
  },
  {
    "name": "Kuala Lumpur, Malaysia",
    "lat": 3.139,
    "lng": 101.6869
  },
  {
    "name": "Kuchaiburi, Odisha, India",
    "lat": 22.26675,
    "lng": 86.17385
  },
  {
    "name": "Kuchaman, Rajasthan, India",
    "lat": 27.14745,
    "lng": 74.85655
  },
  {
    "name": "Kuchera, Rajasthan, India",
    "lat": 26.98747,
    "lng": 73.97108
  },
  {
    "name": "Kuchesar, Uttar Pradesh, India",
    "lat": 28.68333333,
    "lng": 77.95
  },
  {
    "name": "Kuchinda, Odisha, India",
    "lat": 21.74356,
    "lng": 84.34848
  },
  {
    "name": "Kud, Jammu and Kashmir, India",
    "lat": 33.07246,
    "lng": 75.28727
  },
  {
    "name": "Kudachi, Karnataka, India",
    "lat": 16.62784,
    "lng": 74.85408
  },
  {
    "name": "Kudal, Maharashtra, India",
    "lat": 16.01148,
    "lng": 73.68867
  },
  {
    "name": "Kudarkot, Uttar Pradesh, India",
    "lat": 26.81666667,
    "lng": 79.4
  },
  {
    "name": "Kudligi, Karnataka, India",
    "lat": 14.905,
    "lng": 76.38527
  },
  {
    "name": "Kuhi, Maharashtra, India",
    "lat": 21.01082222,
    "lng": 79.35242222
  },
  {
    "name": "Kuju, Jharkhand, India",
    "lat": 23.72536,
    "lng": 85.51023
  },
  {
    "name": "Kukarmunda, Gujarat, India",
    "lat": 21.51666667,
    "lng": 74.13333333
  },
  {
    "name": "Kukatpally, Telangana, India",
    "lat": 17.48486,
    "lng": 78.41376
  },
  {
    "name": "Kukma, Gujarat, India",
    "lat": 23.217822,
    "lng": 69.777922
  },
  {
    "name": "Kukshi, Madhya Pradesh, India",
    "lat": 22.20677,
    "lng": 74.75788
  },
  {
    "name": "Kulattur, Tamil Nadu, India",
    "lat": 9.0032,
    "lng": 78.1928
  },
  {
    "name": "Kulgam, Jammu and Kashmir, India",
    "lat": 33.64456,
    "lng": 75.01923
  },
  {
    "name": "Kulittalai, Tamil Nadu, India",
    "lat": 10.93487,
    "lng": 78.41251
  },
  {
    "name": "Kulpahar, Uttar Pradesh, India",
    "lat": 25.32007,
    "lng": 79.63931
  },
  {
    "name": "Kulpi, West Bengal, India",
    "lat": 22.08,
    "lng": 88.24
  },
  {
    "name": "Kultali, West Bengal, India",
    "lat": 21.9,
    "lng": 88.4
  },
  {
    "name": "Kulti, West Bengal, India",
    "lat": 23.73,
    "lng": 86.85
  },
  {
    "name": "Kulu, Himachal Pradesh, India",
    "lat": 32,
    "lng": 77.25
  },
  {
    "name": "Kumaralingam, Tamil Nadu, India",
    "lat": 10.48936,
    "lng": 77.3499
  },
  {
    "name": "Kumbakonam, Tamil Nadu, India",
    "lat": 10.96209,
    "lng": 79.39124
  },
  {
    "name": "Kumbalam, Kerala, India",
    "lat": 9.9063,
    "lng": 76.31127
  },
  {
    "name": "Kumbhraj, Madhya Pradesh, India",
    "lat": 24.37338,
    "lng": 77.04841
  },
  {
    "name": "Kumhari, Chhattisgarh, India",
    "lat": 21.26667,
    "lng": 81.51667
  },
  {
    "name": "Kumher, Rajasthan, India",
    "lat": 27.31657,
    "lng": 77.37079
  },
  {
    "name": "Kumsi, Karnataka, India",
    "lat": 14.05455,
    "lng": 75.39992
  },
  {
    "name": "Kumta, Karnataka, India",
    "lat": 14.42853,
    "lng": 74.4189
  },
  {
    "name": "Kunda, Uttar Pradesh, India",
    "lat": 25.71702,
    "lng": 81.51396
  },
  {
    "name": "Kundarkhi, Uttar Pradesh, India",
    "lat": 28.68304,
    "lng": 78.78559
  },
  {
    "name": "Kundarki, Uttar Pradesh, India",
    "lat": 28.683,
    "lng": 78.785
  },
  {
    "name": "Kundgol, Karnataka, India",
    "lat": 15.25612,
    "lng": 75.24735
  },
  {
    "name": "Kundla, Gujarat, India",
    "lat": 21.34222,
    "lng": 71.30633
  },
  {
    "name": "Kunigal, Karnataka, India",
    "lat": 13.02319,
    "lng": 77.02518
  },
  {
    "name": "Kunnamangalam, Kerala, India",
    "lat": 11.30459,
    "lng": 75.87772
  },
  {
    "name": "Kunnamkulam, Kerala, India",
    "lat": 10.64667,
    "lng": 76.06695
  },
  {
    "name": "Kunnattur, Tamil Nadu, India",
    "lat": 12.34782,
    "lng": 78.51046
  },
  {
    "name": "Kunnumma, Kerala, India",
    "lat": 9.35672,
    "lng": 76.41343
  },
  {
    "name": "Kuppam, Andhra Pradesh, India",
    "lat": 12.74931,
    "lng": 78.34189
  },
  {
    "name": "Kupwara, Jammu and Kashmir, India",
    "lat": 34.53193,
    "lng": 74.26605
  },
  {
    "name": "Kurandvad, Maharashtra, India",
    "lat": 16.68317,
    "lng": 74.58892
  },
  {
    "name": "Kurankhed, Maharashtra, India",
    "lat": 20.70194444,
    "lng": 77.24972222
  },
  {
    "name": "Kurara, Uttar Pradesh, India",
    "lat": 25.98046,
    "lng": 79.98984
  },
  {
    "name": "Kurduvadi, Maharashtra, India",
    "lat": 18.09339,
    "lng": 75.41567
  },
  {
    "name": "Kurebharsaidkhanpur, Uttar Pradesh, India",
    "lat": 26.43333333,
    "lng": 82.11666667
  },
  {
    "name": "Kurgunta, Karnataka, India",
    "lat": 17.19321,
    "lng": 77.35772
  },
  {
    "name": "Kurinjippadi, Tamil Nadu, India",
    "lat": 11.55028,
    "lng": 79.59066
  },
  {
    "name": "Kurnool, Andhra Pradesh, India",
    "lat": 15.58333,
    "lng": 78.33333
  },
  {
    "name": "Kurseong, West Bengal, India",
    "lat": 26.88,
    "lng": 88.28
  },
  {
    "name": "Kurud, Chhattisgarh, India",
    "lat": 20.83073,
    "lng": 81.72212
  },
  {
    "name": "Kurukshetra, Haryana, India",
    "lat": 30,
    "lng": 76.75
  },
  {
    "name": "Kurung Kumey, Arunachal Pradesh, India",
    "lat": 27.99983,
    "lng": 93.3924
  },
  {
    "name": "Kushalgarh, Rajasthan, India",
    "lat": 23.19899,
    "lng": 74.45074
  },
  {
    "name": "Kushalnagar, Karnataka, India",
    "lat": 12.45795,
    "lng": 75.95904
  },
  {
    "name": "Kushinagar, Uttar Pradesh, India",
    "lat": 26.74028,
    "lng": 83.88889
  },
  {
    "name": "Kushtagi, Karnataka, India",
    "lat": 15.75623,
    "lng": 76.19112
  },
  {
    "name": "Kusmara, Uttar Pradesh, India",
    "lat": 27.11666667,
    "lng": 79.28333333
  },
  {
    "name": "Kusumba, Maharashtra, India",
    "lat": 20.91666667,
    "lng": 74.65
  },
  {
    "name": "Kutch, Gujarat, India",
    "lat": 23.915,
    "lng": 70.367
  },
  {
    "name": "Kuthaund, Uttar Pradesh, India",
    "lat": 26.36666667,
    "lng": 79.41666667
  },
  {
    "name": "Kutiatodu, Kerala, India",
    "lat": 9.8,
    "lng": 76.33333
  },
  {
    "name": "Kutiyana, Gujarat, India",
    "lat": 21.6241,
    "lng": 69.98494
  },
  {
    "name": "Kuttalam, Tamil Nadu, India",
    "lat": 8.9303,
    "lng": 77.26951
  },
  {
    "name": "Kuttampuzha, Kerala, India",
    "lat": 10.15033,
    "lng": 76.73544
  },
  {
    "name": "Kuwait City, Kuwait",
    "lat": 29.3759,
    "lng": 47.9774
  },
  {
    "name": "Kuzhithurai, Tamil Nadu, India",
    "lat": 8.31792,
    "lng": 77.19192
  },
  {
    "name": "Kyathampalle, Telangana, India",
    "lat": 19.66781,
    "lng": 78.5289
  },
  {
    "name": "Kyelang, Himachal Pradesh, India",
    "lat": 32.5717,
    "lng": 77.02448
  },
  {
    "name": "Lachhmangarh Sikar, Rajasthan, India",
    "lat": 27.82294,
    "lng": 75.02754
  },
  {
    "name": "Ladakh, Jammu and Kashmir, India",
    "lat": 34.33333,
    "lng": 77.41667
  },
  {
    "name": "Ladnun, Rajasthan, India",
    "lat": 27.65312,
    "lng": 74.39993
  },
  {
    "name": "Ladol, Gujarat, India",
    "lat": 23.61666667,
    "lng": 72.73333333
  },
  {
    "name": "Ladwa, Haryana, India",
    "lat": 29.9935,
    "lng": 77.04563
  },
  {
    "name": "Lahar, Madhya Pradesh, India",
    "lat": 26.19401,
    "lng": 78.94137
  },
  {
    "name": "Laharpur, Uttar Pradesh, India",
    "lat": 27.70827,
    "lng": 80.90256
  },
  {
    "name": "Lahore, Pakistan",
    "lat": 31.5204,
    "lng": 74.3587
  },
  {
    "name": "Lahul and Spiti, Himachal Pradesh, India",
    "lat": 32.5,
    "lng": 77.83333
  },
  {
    "name": "Lakhandur, Maharashtra, India",
    "lat": 20.75,
    "lng": 79.88333333
  },
  {
    "name": "Lakheri, Rajasthan, India",
    "lat": 25.67237,
    "lng": 76.17692
  },
  {
    "name": "Lakhimpur, Assam, India",
    "lat": 27.35,
    "lng": 94.25
  },
  {
    "name": "Lakhimpur, Uttar Pradesh, India",
    "lat": 27.94822,
    "lng": 80.77935
  },
  {
    "name": "Lakhipur, Assam, India",
    "lat": 24.79281,
    "lng": 93.0091
  },
  {
    "name": "Lakhisarai, Bihar, India",
    "lat": 25.2,
    "lng": 86.2
  },
  {
    "name": "Lakhna, Uttar Pradesh, India",
    "lat": 26.64822,
    "lng": 79.1477
  },
  {
    "name": "Lakhnadon, Madhya Pradesh, India",
    "lat": 22.60049,
    "lng": 79.60094
  },
  {
    "name": "Lakhpat, Gujarat, India",
    "lat": 23.82611111,
    "lng": 68.77694444
  },
  {
    "name": "Lakhtar, Gujarat, India",
    "lat": 22.85683,
    "lng": 71.78844
  },
  {
    "name": "Laksar, Uttarakhand, India",
    "lat": 29.7587,
    "lng": 78.04148
  },
  {
    "name": "Lakshadweep, Lakshadweep, India",
    "lat": 11.27333,
    "lng": 74.04582
  },
  {
    "name": "Lakshettipet, Telangana, India",
    "lat": 18.86667,
    "lng": 79.21667
  },
  {
    "name": "Lakshmeshwar, Karnataka, India",
    "lat": 15.12689,
    "lng": 75.46935
  },
  {
    "name": "Lal Bahadur Nagar, Telangana, India",
    "lat": 17.34769,
    "lng": 78.55757
  },
  {
    "name": "Lala, Assam, India",
    "lat": 24.55418,
    "lng": 92.61592
  },
  {
    "name": "Lalam, Kerala, India",
    "lat": 9.71667,
    "lng": 76.7
  },
  {
    "name": "Lalganj, Bihar, India",
    "lat": 25.86894,
    "lng": 85.17394
  },
  {
    "name": "Lalganj, Uttar Pradesh, India",
    "lat": 25.93182,
    "lng": 81.70478
  },
  {
    "name": "Lalgarh, West Bengal, India",
    "lat": 22.58,
    "lng": 87.05
  },
  {
    "name": "Lalgola, West Bengal, India",
    "lat": 24.42,
    "lng": 88.25
  },
  {
    "name": "Lalgudi, Tamil Nadu, India",
    "lat": 10.87419,
    "lng": 78.81935
  },
  {
    "name": "Lalitpur, Uttar Pradesh, India",
    "lat": 24.5,
    "lng": 78.5
  },
  {
    "name": "Lalpur, Gujarat, India",
    "lat": 22.19073,
    "lng": 69.96351
  },
  {
    "name": "Lalsot, Rajasthan, India",
    "lat": 26.55951,
    "lng": 76.32915
  },
  {
    "name": "Lambhua, Uttar Pradesh, India",
    "lat": 26.15,
    "lng": 82.21
  },
  {
    "name": "Langhnaj, Gujarat, India",
    "lat": 23.45,
    "lng": 72.48333333
  },
  {
    "name": "Lanja, Maharashtra, India",
    "lat": 16.86086,
    "lng": 73.54993
  },
  {
    "name": "Lansdowne, Uttarakhand, India",
    "lat": 29.84183,
    "lng": 78.68014
  },
  {
    "name": "Lar, Uttar Pradesh, India",
    "lat": 26.20394,
    "lng": 83.96906
  },
  {
    "name": "Lasalgaon, Maharashtra, India",
    "lat": 20.1427,
    "lng": 74.23946
  },
  {
    "name": "Latehar, Jharkhand, India",
    "lat": 23.75,
    "lng": 84.4
  },
  {
    "name": "Lathi, Gujarat, India",
    "lat": 21.7231,
    "lng": 71.38843
  },
  {
    "name": "Latur, Maharashtra, India",
    "lat": 18.4,
    "lng": 76.8
  },
  {
    "name": "Laungowal, Punjab, India",
    "lat": 30.19393,
    "lng": 75.68089
  },
  {
    "name": "Lavasa, Maharashtra, India",
    "lat": 18.40528056,
    "lng": 73.50626944
  },
  {
    "name": "Lawar Khas, Uttar Pradesh, India",
    "lat": 29.11091,
    "lng": 77.77767
  },
  {
    "name": "Lawar, Uttar Pradesh, India",
    "lat": 29.11666667,
    "lng": 77.76666667
  },
  {
    "name": "Lawngtlai, Mizoram, India",
    "lat": 22.53,
    "lng": 92.9
  },
  {
    "name": "Leh, Ladakh, India",
    "lat": 34.16504,
    "lng": 77.58402
  },
  {
    "name": "Leteri, Madhya Pradesh, India",
    "lat": 24.05979,
    "lng": 77.40858
  },
  {
    "name": "Limbdi, Gujarat, India",
    "lat": 22.56507,
    "lng": 71.81076
  },
  {
    "name": "Limkheda, Gujarat, India",
    "lat": 22.81666667,
    "lng": 73.98333333
  },
  {
    "name": "Lingsugur, Karnataka, India",
    "lat": 16.15876,
    "lng": 76.52174
  },
  {
    "name": "Lodhikheda, Madhya Pradesh, India",
    "lat": 21.58235,
    "lng": 78.85911
  },
  {
    "name": "Lohaghat, Uttarakhand, India",
    "lat": 29.40356,
    "lng": 80.08965
  },
  {
    "name": "Lohardaga, Jharkhand, India",
    "lat": 23.5,
    "lng": 84.6
  },
  {
    "name": "Loharu, Haryana, India",
    "lat": 28.42993,
    "lng": 75.80779
  },
  {
    "name": "Lohit, Arunachal Pradesh, India",
    "lat": 27.84012,
    "lng": 96.19521
  },
  {
    "name": "Lohogaon, Maharashtra, India",
    "lat": 18.59921,
    "lng": 73.92701
  },
  {
    "name": "Lonar, Maharashtra, India",
    "lat": 19.98533,
    "lng": 76.52046
  },
  {
    "name": "Lonavla, Maharashtra, India",
    "lat": 18.75275,
    "lng": 73.40575
  },
  {
    "name": "Londa, Karnataka, India",
    "lat": 15.46907,
    "lng": 74.51906
  },
  {
    "name": "London, UK",
    "lat": 51.5074,
    "lng": -0.1278
  },
  {
    "name": "Loni, Uttar Pradesh, India",
    "lat": 28.75143,
    "lng": 77.29023
  },
  {
    "name": "Lormi, Chhattisgarh, India",
    "lat": 22.27434,
    "lng": 81.70181
  },
  {
    "name": "Los Angeles, CA, USA",
    "lat": 34.0522,
    "lng": -118.2437
  },
  {
    "name": "Losal, Rajasthan, India",
    "lat": 27.4,
    "lng": 74.91667
  },
  {
    "name": "Lower Dibang Valley, Arunachal Pradesh, India",
    "lat": 28.37258,
    "lng": 95.8804
  },
  {
    "name": "Lower Subansiri, Arunachal Pradesh, India",
    "lat": 27.62554,
    "lng": 93.93908
  },
  {
    "name": "Loyabad, West Bengal, India",
    "lat": 23.67,
    "lng": 86.67
  },
  {
    "name": "Luckeesarai, Bihar, India",
    "lat": 25.1765,
    "lng": 86.0947
  },
  {
    "name": "Lucknow District, Uttar Pradesh, India",
    "lat": 26.75,
    "lng": 81
  },
  {
    "name": "Lucknow, Uttar Pradesh, India",
    "lat": 26.83928,
    "lng": 80.92313
  },
  {
    "name": "Ludhiana, Punjab, India",
    "lat": 30.91204,
    "lng": 75.85379
  },
  {
    "name": "Lumding Railway Colony, Assam, India",
    "lat": 25.74903,
    "lng": 93.16998
  },
  {
    "name": "Lunavada, Gujarat, India",
    "lat": 23.12841,
    "lng": 73.61043
  },
  {
    "name": "Lunglei, Mizoram, India",
    "lat": 22.9,
    "lng": 92.75
  },
  {
    "name": "Machalpur, Madhya Pradesh, India",
    "lat": 24.12767,
    "lng": 76.31672
  },
  {
    "name": "Macherla, Andhra Pradesh, India",
    "lat": 16.47635,
    "lng": 79.43533
  },
  {
    "name": "Machhali Shahar, Uttar Pradesh, India",
    "lat": 25.68,
    "lng": 82.42
  },
  {
    "name": "Machhiwara, Punjab, India",
    "lat": 30.91557,
    "lng": 76.20016
  },
  {
    "name": "Machhlishahr, Uttar Pradesh, India",
    "lat": 25.68564,
    "lng": 82.41106
  },
  {
    "name": "Machilipatnam, Andhra Pradesh, India",
    "lat": 16.18747,
    "lng": 81.13888
  },
  {
    "name": "Madambakkam, Tamil Nadu, India",
    "lat": 12.8525,
    "lng": 80.04667
  },
  {
    "name": "Madanapalle, Andhra Pradesh, India",
    "lat": 13.5503,
    "lng": 78.50288
  },
  {
    "name": "Madanpur, West Bengal, India",
    "lat": 23.02,
    "lng": 88.48
  },
  {
    "name": "Maddagiri, Karnataka, India",
    "lat": 13.66035,
    "lng": 77.21239
  },
  {
    "name": "Maddur, Karnataka, India",
    "lat": 12.58283,
    "lng": 77.04294
  },
  {
    "name": "Madgaon, Goa, India",
    "lat": 15.27501,
    "lng": 73.95786
  },
  {
    "name": "Madhavpur Ghed, Gujarat, India",
    "lat": 21.29929167,
    "lng": 70.02513889
  },
  {
    "name": "Madhepura, Bihar, India",
    "lat": 25.8,
    "lng": 87
  },
  {
    "name": "Madhi, Gujarat, India",
    "lat": 22.1,
    "lng": 69.1
  },
  {
    "name": "Madhoganj, Uttar Pradesh, India",
    "lat": 27.11807,
    "lng": 80.14058
  },
  {
    "name": "Madhogarh, Madhya Pradesh, India",
    "lat": 24.56401,
    "lng": 80.91126
  },
  {
    "name": "Madhogarh, Uttar Pradesh, India",
    "lat": 26.27522,
    "lng": 79.1859
  },
  {
    "name": "Madhubani, Bihar, India",
    "lat": 26.35367,
    "lng": 86.07169
  },
  {
    "name": "Madhupur, Jharkhand, India",
    "lat": 24.27419,
    "lng": 86.63929
  },
  {
    "name": "Madhyamgram, West Bengal, India",
    "lat": 22.7,
    "lng": 88.45
  },
  {
    "name": "Madikeri, Karnataka, India",
    "lat": 12.42602,
    "lng": 75.7382
  },
  {
    "name": "Madipakkam, Tamil Nadu, India",
    "lat": 12.96226,
    "lng": 80.19864
  },
  {
    "name": "Madrid, Spain",
    "lat": 40.4168,
    "lng": -3.7038
  },
  {
    "name": "Madugula, Andhra Pradesh, India",
    "lat": 17.91589,
    "lng": 82.81578
  },
  {
    "name": "Madukkarai, Tamil Nadu, India",
    "lat": 10.90568,
    "lng": 76.96344
  },
  {
    "name": "Madukkur, Tamil Nadu, India",
    "lat": 10.48098,
    "lng": 79.39939
  },
  {
    "name": "Madurai, Tamil Nadu, India",
    "lat": 9.89,
    "lng": 78.03
  },
  {
    "name": "Madurantakam, Tamil Nadu, India",
    "lat": 12.51167,
    "lng": 79.88485
  },
  {
    "name": "Magadi, Karnataka, India",
    "lat": 12.95706,
    "lng": 77.22374
  },
  {
    "name": "Magam, Jammu and Kashmir, India",
    "lat": 34.09256,
    "lng": 74.59016
  },
  {
    "name": "Maghar, Uttar Pradesh, India",
    "lat": 26.75586,
    "lng": 83.12773
  },
  {
    "name": "Mahabaleshwar, Maharashtra, India",
    "lat": 17.56,
    "lng": 73.4
  },
  {
    "name": "Mahaban, Uttar Pradesh, India",
    "lat": 27.43262,
    "lng": 77.74338
  },
  {
    "name": "Mahabubabad, Telangana, India",
    "lat": 17.6004,
    "lng": 80.00543
  },
  {
    "name": "Mahad, Maharashtra, India",
    "lat": 18.08333,
    "lng": 73.41667
  },
  {
    "name": "Mahalingpur, Karnataka, India",
    "lat": 16.3888,
    "lng": 75.10873
  },
  {
    "name": "Maham, Haryana, India",
    "lat": 28.96912,
    "lng": 76.29495
  },
  {
    "name": "Mahape, Maharashtra, India",
    "lat": 19.11776,
    "lng": 73.026938
  },
  {
    "name": "Maharajgani, Bihar, India",
    "lat": 26.11017,
    "lng": 84.50365
  },
  {
    "name": "Maharajganj, Uttar Pradesh, India",
    "lat": 27.16945,
    "lng": 83.50667
  },
  {
    "name": "Mahasamund, Chhattisgarh, India",
    "lat": 21.2,
    "lng": 82.5
  },
  {
    "name": "Mahbubnagar, Telangana, India",
    "lat": 16.63171,
    "lng": 77.75556
  },
  {
    "name": "Mahe, Kerala, India",
    "lat": 11.70172,
    "lng": 75.53474
  },
  {
    "name": "Mahe, Puducherry, India",
    "lat": 11.7,
    "lng": 75.53333
  },
  {
    "name": "Mahemdavad, Gujarat, India",
    "lat": 22.82359,
    "lng": 72.75551
  },
  {
    "name": "Mahendragarh, Haryana, India",
    "lat": 28.25,
    "lng": 76.16667
  },
  {
    "name": "Mahesana, Gujarat, India",
    "lat": 23.66667,
    "lng": 72.5
  },
  {
    "name": "Maheshwar, Madhya Pradesh, India",
    "lat": 22.17592,
    "lng": 75.58715
  },
  {
    "name": "Mahgawan, Madhya Pradesh, India",
    "lat": 26.49471,
    "lng": 78.61593
  },
  {
    "name": "Mahiari, West Bengal, India",
    "lat": 22.59,
    "lng": 88.24
  },
  {
    "name": "Mahim, Maharashtra, India",
    "lat": 19.035,
    "lng": 72.84
  },
  {
    "name": "Mahisa, Gujarat, India",
    "lat": 22.85,
    "lng": 73.05
  },
  {
    "name": "Mahishadal community development block, West Bengal, India",
    "lat": 22.183333,
    "lng": 87.983333
  },
  {
    "name": "Mahmudabad, Uttar Pradesh, India",
    "lat": 27.29191,
    "lng": 81.11775
  },
  {
    "name": "Mahoba, Uttar Pradesh, India",
    "lat": 25.2921,
    "lng": 79.87242
  },
  {
    "name": "Maholi, Uttar Pradesh, India",
    "lat": 27.66368,
    "lng": 80.47371
  },
  {
    "name": "Mahrajganj (Raebareli), Uttar Pradesh, India",
    "lat": 26.38333333,
    "lng": 81.28333333
  },
  {
    "name": "Mahrajganj, Uttar Pradesh, India",
    "lat": 26.26666667,
    "lng": 83.11666667
  },
  {
    "name": "Mahroni, Uttar Pradesh, India",
    "lat": 24.58624,
    "lng": 78.72771
  },
  {
    "name": "Mahudha, Gujarat, India",
    "lat": 22.82082,
    "lng": 72.94032
  },
  {
    "name": "Mahul, Uttar Pradesh, India",
    "lat": 26.13333333,
    "lng": 82.81666667
  },
  {
    "name": "Mahur, Assam, India",
    "lat": 25.18305,
    "lng": 93.11342
  },
  {
    "name": "Mahuva (Surat), Gujarat, India",
    "lat": 21.02,
    "lng": 73.15
  },
  {
    "name": "Mahuva, Gujarat, India",
    "lat": 21.0833,
    "lng": 71.8
  },
  {
    "name": "Mahwah, Rajasthan, India",
    "lat": 27.04594,
    "lng": 76.93152
  },
  {
    "name": "Maibong, Assam, India",
    "lat": 25.30125,
    "lng": 93.13811
  },
  {
    "name": "Maihar, Madhya Pradesh, India",
    "lat": 24.26594,
    "lng": 80.76063
  },
  {
    "name": "Mailani, Uttar Pradesh, India",
    "lat": 28.29088,
    "lng": 80.3438
  },
  {
    "name": "Mainaguri, West Bengal, India",
    "lat": 26.57,
    "lng": 88.82
  },
  {
    "name": "Maindargi, Maharashtra, India",
    "lat": 17.45739,
    "lng": 76.2932
  },
  {
    "name": "Mainpuri, Uttar Pradesh, India",
    "lat": 27.16667,
    "lng": 79
  },
  {
    "name": "Mairang, Meghalaya, India",
    "lat": 25.56165,
    "lng": 91.63602
  },
  {
    "name": "Mairwa, Bihar, India",
    "lat": 26.23218,
    "lng": 84.16349
  },
  {
    "name": "Majalgaon, Maharashtra, India",
    "lat": 19.15988,
    "lng": 76.20832
  },
  {
    "name": "Majholi, Madhya Pradesh, India",
    "lat": 23.50114,
    "lng": 79.92396
  },
  {
    "name": "Majhupur, Uttar Pradesh, India",
    "lat": 27.03333333,
    "lng": 79.41666667
  },
  {
    "name": "Majitha, Punjab, India",
    "lat": 31.75711,
    "lng": 74.95891
  },
  {
    "name": "Makanpur, Uttar Pradesh, India",
    "lat": 26.90222222,
    "lng": 79.97805556
  },
  {
    "name": "Makhjan, Maharashtra, India",
    "lat": 17.2698,
    "lng": 73.50031
  },
  {
    "name": "Makhu, Punjab, India",
    "lat": 31.10335,
    "lng": 74.99631
  },
  {
    "name": "Makrana, Rajasthan, India",
    "lat": 27.04361,
    "lng": 74.72445
  },
  {
    "name": "Maksi, Madhya Pradesh, India",
    "lat": 23.25999,
    "lng": 76.14567
  },
  {
    "name": "Makum, Assam, India",
    "lat": 27.48652,
    "lng": 95.43646
  },
  {
    "name": "Malabar Hill, Maharashtra, India",
    "lat": 18.95,
    "lng": 72.795
  },
  {
    "name": "Malad, Maharashtra, India",
    "lat": 19.18611111,
    "lng": 72.84861111
  },
  {
    "name": "Malappuram, Kerala, India",
    "lat": 11,
    "lng": 76.16667
  },
  {
    "name": "Malasa, Uttar Pradesh, India",
    "lat": 26.26755,
    "lng": 79.94489
  },
  {
    "name": "Malaut, Punjab, India",
    "lat": 30.21121,
    "lng": 74.4818
  },
  {
    "name": "Malavalli, Karnataka, India",
    "lat": 12.38556,
    "lng": 77.06045
  },
  {
    "name": "Malegaon, Maharashtra, India",
    "lat": 20.54966,
    "lng": 74.53462
  },
  {
    "name": "Malerkotla, Punjab, India",
    "lat": 30.5309,
    "lng": 75.87949
  },
  {
    "name": "Malhargarh, Madhya Pradesh, India",
    "lat": 24.28286,
    "lng": 74.99024
  },
  {
    "name": "Malihabad, Uttar Pradesh, India",
    "lat": 26.92223,
    "lng": 80.71078
  },
  {
    "name": "Malkajgiri, Telangana, India",
    "lat": 17.44781,
    "lng": 78.52633
  },
  {
    "name": "Malkangiri, Odisha, India",
    "lat": 18.25,
    "lng": 81.95
  },
  {
    "name": "Malkapur, Maharashtra, India",
    "lat": 17.26214,
    "lng": 74.17574
  },
  {
    "name": "Malkera, Jharkhand, India",
    "lat": 23.78213,
    "lng": 86.28767
  },
  {
    "name": "Mallapuram, Tamil Nadu, India",
    "lat": 11.98231,
    "lng": 78.24796
  },
  {
    "name": "Mallasamudram, Tamil Nadu, India",
    "lat": 11.49333,
    "lng": 78.03119
  },
  {
    "name": "Mallur, Tamil Nadu, India",
    "lat": 11.54424,
    "lng": 78.14078
  },
  {
    "name": "Malpe, Karnataka, India",
    "lat": 13.34962,
    "lng": 74.70394
  },
  {
    "name": "Malpur, Gujarat, India",
    "lat": 23.36035,
    "lng": 73.46595
  },
  {
    "name": "Malpura, Rajasthan, India",
    "lat": 26.2838,
    "lng": 75.36458
  },
  {
    "name": "Malur, Karnataka, India",
    "lat": 13.00322,
    "lng": 77.93798
  },
  {
    "name": "Malvan, Maharashtra, India",
    "lat": 16.05981,
    "lng": 73.4629
  },
  {
    "name": "Mamit, Mizoram, India",
    "lat": 23.78492,
    "lng": 92.46939
  },
  {
    "name": "Manali, Himachal Pradesh, India",
    "lat": 32.2574,
    "lng": 77.17481
  },
  {
    "name": "Manali, Tamil Nadu, India",
    "lat": 13.16667,
    "lng": 80.26667
  },
  {
    "name": "Manalurpettai, Tamil Nadu, India",
    "lat": 12.00788,
    "lng": 79.09184
  },
  {
    "name": "Manama, Bahrain",
    "lat": 26.2285,
    "lng": 50.586
  },
  {
    "name": "Manamadurai, Tamil Nadu, India",
    "lat": 9.67318,
    "lng": 78.47096
  },
  {
    "name": "Manappakkam, Tamil Nadu, India",
    "lat": 13.01083,
    "lng": 80.16861
  },
  {
    "name": "Manapparai, Tamil Nadu, India",
    "lat": 10.60772,
    "lng": 78.42582
  },
  {
    "name": "Manasa, Madhya Pradesh, India",
    "lat": 24.47764,
    "lng": 75.14095
  },
  {
    "name": "Manavadar, Gujarat, India",
    "lat": 21.49813,
    "lng": 70.13775
  },
  {
    "name": "Manavalakurichi, Tamil Nadu, India",
    "lat": 8.14776,
    "lng": 77.30552
  },
  {
    "name": "Manawar, Madhya Pradesh, India",
    "lat": 22.23566,
    "lng": 75.08917
  },
  {
    "name": "Manchar, Maharashtra, India",
    "lat": 19.00436,
    "lng": 73.94346
  },
  {
    "name": "Mancheral, Telangana, India",
    "lat": 18.87074,
    "lng": 79.42863
  },
  {
    "name": "Manchester, UK",
    "lat": 53.4808,
    "lng": -2.2426
  },
  {
    "name": "Mandal, Gujarat, India",
    "lat": 23.28865,
    "lng": 71.91854
  },
  {
    "name": "Mandal, Rajasthan, India",
    "lat": 25.44126,
    "lng": 74.56979
  },
  {
    "name": "Mandalgarh, Rajasthan, India",
    "lat": 25.19407,
    "lng": 75.07215
  },
  {
    "name": "Mandamarri, Telangana, India",
    "lat": 18.96506,
    "lng": 79.47475
  },
  {
    "name": "Mandangad, Maharashtra, India",
    "lat": 17.98333333,
    "lng": 73.25
  },
  {
    "name": "Mandapam, Tamil Nadu, India",
    "lat": 9.27571,
    "lng": 79.12362
  },
  {
    "name": "Mandapeta, Andhra Pradesh, India",
    "lat": 16.86254,
    "lng": 81.92921
  },
  {
    "name": "Mandasa, Andhra Pradesh, India",
    "lat": 18.8683,
    "lng": 84.46296
  },
  {
    "name": "Mandawar, Rajasthan, India",
    "lat": 27.86374,
    "lng": 76.54999
  },
  {
    "name": "Mandawar, Uttar Pradesh, India",
    "lat": 29.48655,
    "lng": 78.12732
  },
  {
    "name": "Mandhal, Maharashtra, India",
    "lat": 20.95,
    "lng": 79.46666667
  },
  {
    "name": "Mandholi Kalan, Haryana, India",
    "lat": 28.7085,
    "lng": 75.68296
  },
  {
    "name": "Mandi, Himachal Pradesh, India",
    "lat": 31.71194,
    "lng": 76.93273
  },
  {
    "name": "Mandideep, Madhya Pradesh, India",
    "lat": 23.08166,
    "lng": 77.53328
  },
  {
    "name": "Mandla, Madhya Pradesh, India",
    "lat": 22.64041,
    "lng": 80.51344
  },
  {
    "name": "Mandleshwar, Madhya Pradesh, India",
    "lat": 22.17598,
    "lng": 75.65995
  },
  {
    "name": "Mandsaur, Madhya Pradesh, India",
    "lat": 24.33333,
    "lng": 75.25
  },
  {
    "name": "Mandvi (Surat), Gujarat, India",
    "lat": 21.25526,
    "lng": 73.30412
  },
  {
    "name": "Mandvi, Gujarat, India",
    "lat": 22.83282,
    "lng": 69.35237
  },
  {
    "name": "Mandwa, Maharashtra, India",
    "lat": 18.803,
    "lng": 72.882
  },
  {
    "name": "Mandya, Karnataka, India",
    "lat": 12.5223,
    "lng": 76.89746
  },
  {
    "name": "Maner, Bihar, India",
    "lat": 25.64602,
    "lng": 84.87291
  },
  {
    "name": "Mangalagiri, Andhra Pradesh, India",
    "lat": 16.43083,
    "lng": 80.56815
  },
  {
    "name": "Mangalam, Tamil Nadu, India",
    "lat": 9.76473,
    "lng": 78.64037
  },
  {
    "name": "Mangaldai, Assam, India",
    "lat": 26.44212,
    "lng": 92.03047
  },
  {
    "name": "Mangaluru, Karnataka, India",
    "lat": 12.91723,
    "lng": 74.85603
  },
  {
    "name": "Mangan, Sikkim, India",
    "lat": 27.50965,
    "lng": 88.52206
  },
  {
    "name": "Mangaon, Maharashtra, India",
    "lat": 18.23333333,
    "lng": 73.28333333
  },
  {
    "name": "Mangawan, Madhya Pradesh, India",
    "lat": 24.66754,
    "lng": 81.54644
  },
  {
    "name": "Manglaur, Uttarakhand, India",
    "lat": 29.79094,
    "lng": 77.87836
  },
  {
    "name": "Mangrol (Junagadh), Gujarat, India",
    "lat": 21.12,
    "lng": 70.12
  },
  {
    "name": "Mangrol, Gujarat, India",
    "lat": 21.12268,
    "lng": 70.11484
  },
  {
    "name": "Mangrol, Rajasthan, India",
    "lat": 25.33061,
    "lng": 76.50973
  },
  {
    "name": "Mangrul Pir, Maharashtra, India",
    "lat": 20.31379,
    "lng": 77.34178
  },
  {
    "name": "Maniar, Uttar Pradesh, India",
    "lat": 25.98546,
    "lng": 84.17233
  },
  {
    "name": "Manihari, Bihar, India",
    "lat": 25.33891,
    "lng": 87.61998
  },
  {
    "name": "Manikpara, West Bengal, India",
    "lat": 22.36666667,
    "lng": 87.11666667
  },
  {
    "name": "Manikpur, Uttar Pradesh, India",
    "lat": 25.06083,
    "lng": 81.09961
  },
  {
    "name": "Manila, Philippines",
    "lat": 14.5995,
    "lng": 120.9842
  },
  {
    "name": "Manipal, Karnataka, India",
    "lat": 13.35,
    "lng": 74.78333
  },
  {
    "name": "Manjeri, Kerala, India",
    "lat": 11.12018,
    "lng": 76.11996
  },
  {
    "name": "Manjeshwaram, Kerala, India",
    "lat": 12.71287,
    "lng": 74.88857
  },
  {
    "name": "Manjhanpur, Uttar Pradesh, India",
    "lat": 25.53046,
    "lng": 81.37566
  },
  {
    "name": "Manjlegaon, Maharashtra, India",
    "lat": 19.15,
    "lng": 76.23
  },
  {
    "name": "Mankachar, Meghalaya, India",
    "lat": 25.53347,
    "lng": 89.86373
  },
  {
    "name": "Mankapur, Uttar Pradesh, India",
    "lat": 27.05189,
    "lng": 82.22961
  },
  {
    "name": "Mankeshwar, Maharashtra, India",
    "lat": 18.35416667,
    "lng": 75.63916667
  },
  {
    "name": "Mankhurd, Maharashtra, India",
    "lat": 19.05,
    "lng": 72.93
  },
  {
    "name": "Manmad, Maharashtra, India",
    "lat": 20.25334,
    "lng": 74.43755
  },
  {
    "name": "Mannarakkat, Kerala, India",
    "lat": 10.99223,
    "lng": 76.46418
  },
  {
    "name": "Mannargudi, Tamil Nadu, India",
    "lat": 10.66626,
    "lng": 79.45064
  },
  {
    "name": "Manohar Thana, Rajasthan, India",
    "lat": 24.24,
    "lng": 76.80182
  },
  {
    "name": "Manoharpur, Jharkhand, India",
    "lat": 22.37456,
    "lng": 85.19234
  },
  {
    "name": "Manoharpur, Rajasthan, India",
    "lat": 27.29769,
    "lng": 75.9495
  },
  {
    "name": "Manor, Maharashtra, India",
    "lat": 19.7244,
    "lng": 72.90966
  },
  {
    "name": "Manpur, Madhya Pradesh, India",
    "lat": 22.43151,
    "lng": 75.62107
  },
  {
    "name": "Mansa, Gujarat, India",
    "lat": 23.42564,
    "lng": 72.65739
  },
  {
    "name": "Mansa, Punjab, India",
    "lat": 29.98844,
    "lng": 75.40167
  },
  {
    "name": "Mansar, Maharashtra, India",
    "lat": 21.39602,
    "lng": 79.2635
  },
  {
    "name": "Manthani, Telangana, India",
    "lat": 18.65087,
    "lng": 79.66501
  },
  {
    "name": "Manuguru, Telangana, India",
    "lat": 17.98102,
    "lng": 80.7547
  },
  {
    "name": "Manvi, Karnataka, India",
    "lat": 15.99126,
    "lng": 77.05034
  },
  {
    "name": "Manwat, Maharashtra, India",
    "lat": 19.30133,
    "lng": 76.49735
  },
  {
    "name": "Mapuca, Goa, India",
    "lat": 15.59154,
    "lng": 73.80898
  },
  {
    "name": "Marahra, Uttar Pradesh, India",
    "lat": 27.7368,
    "lng": 78.56891
  },
  {
    "name": "Marakkanam, Tamil Nadu, India",
    "lat": 12.19214,
    "lng": 79.94193
  },
  {
    "name": "Marandahalli, Tamil Nadu, India",
    "lat": 12.38826,
    "lng": 78.00316
  },
  {
    "name": "Marayur, Kerala, India",
    "lat": 10.27641,
    "lng": 77.16205
  },
  {
    "name": "Maregaon, Maharashtra, India",
    "lat": 20.1,
    "lng": 78.81666667
  },
  {
    "name": "Margherita, Arunachal Pradesh, India",
    "lat": 27.28482,
    "lng": 95.66796
  },
  {
    "name": "Marhaura, Bihar, India",
    "lat": 25.97349,
    "lng": 84.86796
  },
  {
    "name": "Mariahu, Uttar Pradesh, India",
    "lat": 25.60404,
    "lng": 82.60379
  },
  {
    "name": "Mariani, Assam, India",
    "lat": 26.65725,
    "lng": 94.31529
  },
  {
    "name": "Markapur, Andhra Pradesh, India",
    "lat": 15.73534,
    "lng": 79.26848
  },
  {
    "name": "Marseille, France",
    "lat": 43.2965,
    "lng": 5.3698
  },
  {
    "name": "Masaurhi Buzurg, Bihar, India",
    "lat": 25.35417,
    "lng": 85.03195
  },
  {
    "name": "Masila, West Bengal, India",
    "lat": 22.58083,
    "lng": 88.23278
  },
  {
    "name": "Masinigudi, Tamil Nadu, India",
    "lat": 11.56831,
    "lng": 76.64087
  },
  {
    "name": "Mastiholi, Maharashtra, India",
    "lat": 16.08333333,
    "lng": 74.55
  },
  {
    "name": "Masur India, Maharashtra, India",
    "lat": 17.4,
    "lng": 74.15
  },
  {
    "name": "Mataundh, Uttar Pradesh, India",
    "lat": 25.43594,
    "lng": 80.15653
  },
  {
    "name": "Mathabhanga, West Bengal, India",
    "lat": 26.34197,
    "lng": 89.21555
  },
  {
    "name": "Matheran, Maharashtra, India",
    "lat": 18.98281,
    "lng": 73.2652
  },
  {
    "name": "Mathura, Uttar Pradesh, India",
    "lat": 27.63333,
    "lng": 77.58333
  },
  {
    "name": "Matiali community development block, West Bengal, India",
    "lat": 26.927159,
    "lng": 88.8133049
  },
  {
    "name": "Matigara community development block, West Bengal, India",
    "lat": 26.716667,
    "lng": 88.383333
  },
  {
    "name": "Mattanur, Kerala, India",
    "lat": 11.93018,
    "lng": 75.57152
  },
  {
    "name": "Mattur, Tamil Nadu, India",
    "lat": 11.32147,
    "lng": 79.20245
  },
  {
    "name": "Matunga, Maharashtra, India",
    "lat": 19.01798056,
    "lng": 72.84476389
  },
  {
    "name": "Mau Aima, Uttar Pradesh, India",
    "lat": 25.7,
    "lng": 81.91666667
  },
  {
    "name": "Mau Aimma, Uttar Pradesh, India",
    "lat": 25.69515,
    "lng": 81.92336
  },
  {
    "name": "Mau, Madhya Pradesh, India",
    "lat": 26.26584,
    "lng": 78.67108
  },
  {
    "name": "Mau, Uttar Pradesh, India",
    "lat": 26.0294,
    "lng": 83.50756
  },
  {
    "name": "Maudaha, Uttar Pradesh, India",
    "lat": 25.68312,
    "lng": 80.11419
  },
  {
    "name": "Mauganj, Madhya Pradesh, India",
    "lat": 24.66721,
    "lng": 81.87339
  },
  {
    "name": "Maur Mandi, Punjab, India",
    "lat": 30.08333,
    "lng": 75.25
  },
  {
    "name": "Maurawan, Uttar Pradesh, India",
    "lat": 26.43,
    "lng": 80.88
  },
  {
    "name": "Mavelikara, Kerala, India",
    "lat": 9.25929,
    "lng": 76.55642
  },
  {
    "name": "Mavoor, Kerala, India",
    "lat": 11.26667,
    "lng": 75.91667
  },
  {
    "name": "Mawana, Uttar Pradesh, India",
    "lat": 29.10288,
    "lng": 77.92199
  },
  {
    "name": "Mawar, Uttar Pradesh, India",
    "lat": 26.30416667,
    "lng": 79.92111111
  },
  {
    "name": "Mayakonda, Karnataka, India",
    "lat": 14.28894,
    "lng": 76.08305
  },
  {
    "name": "Mayiladuthurai, Tamil Nadu, India",
    "lat": 11.10354,
    "lng": 79.655
  },
  {
    "name": "Mayurbhanj, Odisha, India",
    "lat": 21.75,
    "lng": 86.5
  },
  {
    "name": "Mazagaon, Maharashtra, India",
    "lat": 18.97,
    "lng": 72.85
  },
  {
    "name": "Medak, Telangana, India",
    "lat": 17.75,
    "lng": 78.25
  },
  {
    "name": "Medchal Malkajgiri, Telangana, India",
    "lat": 17.60644,
    "lng": 78.54007
  },
  {
    "name": "Medchal, Telangana, India",
    "lat": 17.62972,
    "lng": 78.48139
  },
  {
    "name": "Medinipur, West Bengal, India",
    "lat": 22.4207025,
    "lng": 87.3269963
  },
  {
    "name": "Meerut, Uttar Pradesh, India",
    "lat": 28.91667,
    "lng": 77.68333
  },
  {
    "name": "Meethari Marwar, Rajasthan, India",
    "lat": 27.57615,
    "lng": 74.68661
  },
  {
    "name": "Meghraj, Gujarat, India",
    "lat": 23.49805,
    "lng": 73.51352
  },
  {
    "name": "Mehdawal, Uttar Pradesh, India",
    "lat": 26.98333333,
    "lng": 83.11666667
  },
  {
    "name": "Mehekar, Maharashtra, India",
    "lat": 20.1505,
    "lng": 76.56841
  },
  {
    "name": "Mehergaon, Maharashtra, India",
    "lat": 20.96666667,
    "lng": 74.63333333
  },
  {
    "name": "Mehkar, Maharashtra, India",
    "lat": 20.15,
    "lng": 76.575
  },
  {
    "name": "Mehnagar, Uttar Pradesh, India",
    "lat": 25.87889,
    "lng": 83.11611
  },
  {
    "name": "Mehndawal, Uttar Pradesh, India",
    "lat": 26.97579,
    "lng": 83.10995
  },
  {
    "name": "Mehsana, Gujarat, India",
    "lat": 23.6,
    "lng": 72.4
  },
  {
    "name": "Mejia community development block, West Bengal, India",
    "lat": 23.57,
    "lng": 87.1
  },
  {
    "name": "Melbourne, VIC, Australia",
    "lat": -37.8136,
    "lng": 144.9631
  },
  {
    "name": "Melukote, Karnataka, India",
    "lat": 12.66258,
    "lng": 76.64861
  },
  {
    "name": "Melur, Tamil Nadu, India",
    "lat": 10.03241,
    "lng": 78.3393
  },
  {
    "name": "Memari, West Bengal, India",
    "lat": 23.2,
    "lng": 88.12
  },
  {
    "name": "Mendarda, Gujarat, India",
    "lat": 21.32112,
    "lng": 70.44078
  },
  {
    "name": "Merta, Rajasthan, India",
    "lat": 26.64859,
    "lng": 74.03414
  },
  {
    "name": "Mettuppalaiyam, Tamil Nadu, India",
    "lat": 11.16806,
    "lng": 78.44944
  },
  {
    "name": "Mettur, Tamil Nadu, India",
    "lat": 11.78796,
    "lng": 77.8008
  },
  {
    "name": "Mhasla, Maharashtra, India",
    "lat": 18.1334,
    "lng": 73.11162
  },
  {
    "name": "Mhasvad, Maharashtra, India",
    "lat": 17.63359,
    "lng": 74.78773
  },
  {
    "name": "Miami, FL, USA",
    "lat": 25.7617,
    "lng": -80.1918
  },
  {
    "name": "Mihona, Madhya Pradesh, India",
    "lat": 26.28373,
    "lng": 78.98048
  },
  {
    "name": "Milak, Uttar Pradesh, India",
    "lat": 28.61031,
    "lng": 79.16997
  },
  {
    "name": "Milan, Italy",
    "lat": 45.4642,
    "lng": 9.19
  },
  {
    "name": "Milkipur, Uttar Pradesh, India",
    "lat": 26.6,
    "lng": 81.91
  },
  {
    "name": "Minjur, Tamil Nadu, India",
    "lat": 13.27951,
    "lng": 80.25815
  },
  {
    "name": "Miraj, Maharashtra, India",
    "lat": 16.83,
    "lng": 74.63
  },
  {
    "name": "Miranpur Katra, Uttar Pradesh, India",
    "lat": 28.02963,
    "lng": 79.66778
  },
  {
    "name": "Miranpur, Uttar Pradesh, India",
    "lat": 29.29026,
    "lng": 77.94939
  },
  {
    "name": "Mirganj, Uttar Pradesh, India",
    "lat": 28.54012,
    "lng": 79.20817
  },
  {
    "name": "Mirialguda, Telangana, India",
    "lat": 16.8722,
    "lng": 79.56247
  },
  {
    "name": "Mirik, West Bengal, India",
    "lat": 26.887,
    "lng": 88.187
  },
  {
    "name": "Mirzapur, Uttar Pradesh, India",
    "lat": 25.1449,
    "lng": 82.56534
  },
  {
    "name": "Misrikh, Uttar Pradesh, India",
    "lat": 27.43137,
    "lng": 80.53157
  },
  {
    "name": "Mithapur, Gujarat, India",
    "lat": 22.41,
    "lng": 69
  },
  {
    "name": "Modasa, Gujarat, India",
    "lat": 23.46253,
    "lng": 73.29857
  },
  {
    "name": "Moga, Punjab, India",
    "lat": 30.80376,
    "lng": 75.14938
  },
  {
    "name": "Mohadi, Maharashtra, India",
    "lat": 21.30833333,
    "lng": 79.675
  },
  {
    "name": "Mohali, Punjab, India",
    "lat": 30.67995,
    "lng": 76.72211
  },
  {
    "name": "Mohan, Uttar Pradesh, India",
    "lat": 26.78008,
    "lng": 80.67497
  },
  {
    "name": "Mohanpur, Uttar Pradesh, India",
    "lat": 28.25261,
    "lng": 80.24498
  },
  {
    "name": "Mohanur, Tamil Nadu, India",
    "lat": 11.05936,
    "lng": 78.13965
  },
  {
    "name": "Mohgaon, Madhya Pradesh, India",
    "lat": 21.63941,
    "lng": 78.73638
  },
  {
    "name": "Mohiuddi nagar, Bihar, India",
    "lat": 25.57374,
    "lng": 85.66944
  },
  {
    "name": "Mohol, Maharashtra, India",
    "lat": 17.8167,
    "lng": 75.6667
  },
  {
    "name": "Mohpa, Maharashtra, India",
    "lat": 21.31012,
    "lng": 78.82969
  },
  {
    "name": "Mokameh, Bihar, India",
    "lat": 25.39662,
    "lng": 85.9219
  },
  {
    "name": "Mokhada taluka, Maharashtra, India",
    "lat": 19.93333333,
    "lng": 73.33333333
  },
  {
    "name": "Mokokchung, Nagaland, India",
    "lat": 26.31393,
    "lng": 94.51675
  },
  {
    "name": "Mon, Nagaland, India",
    "lat": 26.75,
    "lng": 94.83333
  },
  {
    "name": "Monghyr, Bihar, India",
    "lat": 25.37459,
    "lng": 86.47455
  },
  {
    "name": "Monoharpur, West Bengal, India",
    "lat": 22.68,
    "lng": 88.3
  },
  {
    "name": "Montreal, QC, Canada",
    "lat": 45.5017,
    "lng": -73.5673
  },
  {
    "name": "Mora Maharashtra, Maharashtra, India",
    "lat": 18.889,
    "lng": 72.934
  },
  {
    "name": "Moradabad, Uttar Pradesh, India",
    "lat": 28.8525,
    "lng": 78.79703
  },
  {
    "name": "Moram, Maharashtra, India",
    "lat": 17.78812,
    "lng": 76.47077
  },
  {
    "name": "Moranha, Assam, India",
    "lat": 27.18735,
    "lng": 94.91557
  },
  {
    "name": "Morar, Madhya Pradesh, India",
    "lat": 26.2264,
    "lng": 78.22482
  },
  {
    "name": "Morbi, Gujarat, India",
    "lat": 22.81731,
    "lng": 70.8377
  },
  {
    "name": "Morena, Madhya Pradesh, India",
    "lat": 26.16667,
    "lng": 77.5
  },
  {
    "name": "Morigaon, Assam, India",
    "lat": 26.25213,
    "lng": 92.34238
  },
  {
    "name": "Morinda, Punjab, India",
    "lat": 30.79014,
    "lng": 76.49883
  },
  {
    "name": "Morjim, Goa, India",
    "lat": 15.63097,
    "lng": 73.73903
  },
  {
    "name": "Mormugao, Goa, India",
    "lat": 15.38914,
    "lng": 73.81491
  },
  {
    "name": "Morsi, Maharashtra, India",
    "lat": 21.3403,
    "lng": 78.01258
  },
  {
    "name": "Morva (Hadaf), Gujarat, India",
    "lat": 22.9474014,
    "lng": 73.834839
  },
  {
    "name": "Morwa, Gujarat, India",
    "lat": 22.9184516,
    "lng": 73.8426033
  },
  {
    "name": "Moscow, Russia",
    "lat": 55.7558,
    "lng": 37.6173
  },
  {
    "name": "Moth, Uttar Pradesh, India",
    "lat": 25.72595,
    "lng": 78.95029
  },
  {
    "name": "Mothihari, Bihar, India",
    "lat": 26.64862,
    "lng": 84.91656
  },
  {
    "name": "Mowad, Maharashtra, India",
    "lat": 21.46475,
    "lng": 78.45103
  },
  {
    "name": "Mubarakpur, Uttar Pradesh, India",
    "lat": 26.08866,
    "lng": 83.29088
  },
  {
    "name": "Mudbidri, Karnataka, India",
    "lat": 13.06653,
    "lng": 74.99525
  },
  {
    "name": "Muddebihal, Karnataka, India",
    "lat": 16.33782,
    "lng": 76.13173
  },
  {
    "name": "Mudgal, Karnataka, India",
    "lat": 16.01191,
    "lng": 76.44203
  },
  {
    "name": "Mudgere, Karnataka, India",
    "lat": 13.13353,
    "lng": 75.6416
  },
  {
    "name": "Mudhol, Karnataka, India",
    "lat": 16.33354,
    "lng": 75.28305
  },
  {
    "name": "Mudkhed, Maharashtra, India",
    "lat": 19.15657,
    "lng": 77.50304
  },
  {
    "name": "Mudukulattur, Tamil Nadu, India",
    "lat": 9.34169,
    "lng": 78.51388
  },
  {
    "name": "Mughal Sarai, Uttar Pradesh, India",
    "lat": 25.28307,
    "lng": 83.11968
  },
  {
    "name": "Mugma, Jharkhand, India",
    "lat": 23.77015,
    "lng": 86.72746
  },
  {
    "name": "Muhammadabad, Uttar Pradesh, India",
    "lat": 25.61907,
    "lng": 83.75576
  },
  {
    "name": "Mukerian, Punjab, India",
    "lat": 31.95394,
    "lng": 75.61716
  },
  {
    "name": "Mukher, Maharashtra, India",
    "lat": 18.70636,
    "lng": 77.36795
  },
  {
    "name": "Mukteshwar, Uttar Pradesh, India",
    "lat": 29.4722,
    "lng": 79.6479
  },
  {
    "name": "Mul, Maharashtra, India",
    "lat": 20.06987,
    "lng": 79.67826
  },
  {
    "name": "Mulanur, Tamil Nadu, India",
    "lat": 10.79426,
    "lng": 77.7115
  },
  {
    "name": "Mulbagal, Karnataka, India",
    "lat": 13.16352,
    "lng": 78.39346
  },
  {
    "name": "Mulgund, Karnataka, India",
    "lat": 15.2807,
    "lng": 75.52132
  },
  {
    "name": "Mulher, Maharashtra, India",
    "lat": 20.78138889,
    "lng": 74.06388889
  },
  {
    "name": "Mulki, Karnataka, India",
    "lat": 13.09101,
    "lng": 74.79353
  },
  {
    "name": "Multai, Madhya Pradesh, India",
    "lat": 21.77463,
    "lng": 78.25756
  },
  {
    "name": "Mulund, Maharashtra, India",
    "lat": 19.17168056,
    "lng": 72.956
  },
  {
    "name": "Muluppilagadu, Kerala, India",
    "lat": 11.79788,
    "lng": 75.45111
  },
  {
    "name": "Mumbai Suburban, Maharashtra, India",
    "lat": 19.12636,
    "lng": 72.84897
  },
  {
    "name": "Mumbai, Maharashtra, India",
    "lat": 19.07283,
    "lng": 72.88261
  },
  {
    "name": "Mundargi, Karnataka, India",
    "lat": 15.20677,
    "lng": 75.8839
  },
  {
    "name": "Mundgod, Karnataka, India",
    "lat": 14.97144,
    "lng": 75.03658
  },
  {
    "name": "Mundi, Madhya Pradesh, India",
    "lat": 22.06693,
    "lng": 76.49326
  },
  {
    "name": "Mundra, Gujarat, India",
    "lat": 22.83918,
    "lng": 69.7219
  },
  {
    "name": "Mundwa, Rajasthan, India",
    "lat": 27.0631,
    "lng": 73.82304
  },
  {
    "name": "Mungaoli, Madhya Pradesh, India",
    "lat": 24.40837,
    "lng": 78.09588
  },
  {
    "name": "Mungeli, Chhattisgarh, India",
    "lat": 22.06566,
    "lng": 81.68543
  },
  {
    "name": "Munger, Bihar, India",
    "lat": 25.36099,
    "lng": 86.46515
  },
  {
    "name": "Mungra Badshahpur, Uttar Pradesh, India",
    "lat": 25.65,
    "lng": 82.18
  },
  {
    "name": "Munich, Germany",
    "lat": 48.1351,
    "lng": 11.582
  },
  {
    "name": "Munirabad, Karnataka, India",
    "lat": 15.30928,
    "lng": 76.3383
  },
  {
    "name": "Munnar, Kerala, India",
    "lat": 10.08818,
    "lng": 77.06239
  },
  {
    "name": "Munsyari, Uttar Pradesh, India",
    "lat": 30.06741389,
    "lng": 80.23856111
  },
  {
    "name": "Muradabad, Uttar Pradesh, India",
    "lat": 28.83888889,
    "lng": 78.77694444
  },
  {
    "name": "Muradnagar, Uttar Pradesh, India",
    "lat": 28.78069,
    "lng": 77.49865
  },
  {
    "name": "Muragacha, West Bengal, India",
    "lat": 23.53631,
    "lng": 88.39425
  },
  {
    "name": "Murbad, Maharashtra, India",
    "lat": 19.25395,
    "lng": 73.38993
  },
  {
    "name": "Murgud, Maharashtra, India",
    "lat": 16.39604,
    "lng": 74.19142
  },
  {
    "name": "Muri, West Bengal, India",
    "lat": 23.37,
    "lng": 85.86
  },
  {
    "name": "Murliganj, Bihar, India",
    "lat": 25.8969,
    "lng": 86.99577
  },
  {
    "name": "Mursan, Uttar Pradesh, India",
    "lat": 27.57788,
    "lng": 77.94091
  },
  {
    "name": "Murshidabad, West Bengal, India",
    "lat": 24.18,
    "lng": 88.27
  },
  {
    "name": "Murtajapur, Maharashtra, India",
    "lat": 20.73299,
    "lng": 77.36694
  },
  {
    "name": "Murud (Raigad), Maharashtra, India",
    "lat": 18.32817,
    "lng": 72.9621
  },
  {
    "name": "Murud (Ratnagiri), Maharashtra, India",
    "lat": 17.77494444,
    "lng": 73.11815
  },
  {
    "name": "Murudeshwara, Karnataka, India",
    "lat": 14.0943,
    "lng": 74.4845
  },
  {
    "name": "Murum, Maharashtra, India",
    "lat": 17.78777778,
    "lng": 76.47
  },
  {
    "name": "Murwara, Madhya Pradesh, India",
    "lat": 23.83776,
    "lng": 80.39405
  },
  {
    "name": "Musafir-Khana, Uttar Pradesh, India",
    "lat": 26.37837,
    "lng": 81.79607
  },
  {
    "name": "Musafirkhana, Uttar Pradesh, India",
    "lat": 26.45,
    "lng": 81.8
  },
  {
    "name": "Muscat, Oman",
    "lat": 23.5859,
    "lng": 58.4059
  },
  {
    "name": "Mushabani, Jharkhand, India",
    "lat": 22.51135,
    "lng": 86.45713
  },
  {
    "name": "Musiri, Tamil Nadu, India",
    "lat": 10.95299,
    "lng": 78.44427
  },
  {
    "name": "Mussoorie, Uttarakhand, India",
    "lat": 30.45498,
    "lng": 78.07068
  },
  {
    "name": "Mustafabad, Haryana, India",
    "lat": 30.2022,
    "lng": 77.14873
  },
  {
    "name": "Muttupet, Tamil Nadu, India",
    "lat": 10.39505,
    "lng": 79.49353
  },
  {
    "name": "Muvattupula, Kerala, India",
    "lat": 9.98493,
    "lng": 76.57728
  },
  {
    "name": "Muvattupuzha, Kerala, India",
    "lat": 9.97985,
    "lng": 76.57381
  },
  {
    "name": "Muzaffarnagar, Uttar Pradesh, India",
    "lat": 29.45,
    "lng": 77.58333
  },
  {
    "name": "Muzaffarpur, Bihar, India",
    "lat": 26.16667,
    "lng": 85.41667
  },
  {
    "name": "Mysuru, Karnataka, India",
    "lat": 12.23,
    "lng": 76.42
  },
  {
    "name": "Nabadwip, West Bengal, India",
    "lat": 23.40722222,
    "lng": 88.37777778
  },
  {
    "name": "Nabagram, West Bengal, India",
    "lat": 22.29,
    "lng": 88.51
  },
  {
    "name": "Nabarangpur, Odisha, India",
    "lat": 19.2333,
    "lng": 82.55
  },
  {
    "name": "Nabha, Punjab, India",
    "lat": 30.37577,
    "lng": 76.15292
  },
  {
    "name": "Nabinagar, Bihar, India",
    "lat": 24.60681,
    "lng": 84.12624
  },
  {
    "name": "Nadapuram, Kerala, India",
    "lat": 11.68465,
    "lng": 75.65493
  },
  {
    "name": "Nadaun, Himachal Pradesh, India",
    "lat": 31.78303,
    "lng": 76.3431
  },
  {
    "name": "Nadbai, Rajasthan, India",
    "lat": 27.22288,
    "lng": 77.19569
  },
  {
    "name": "Nadgaon, Maharashtra, India",
    "lat": 20.90101389,
    "lng": 76.01396389
  },
  {
    "name": "Nadia, West Bengal, India",
    "lat": 23.4847374,
    "lng": 88.5567067
  },
  {
    "name": "Nadiad, Gujarat, India",
    "lat": 22.69385,
    "lng": 72.86157
  },
  {
    "name": "Nadigaon, Uttar Pradesh, India",
    "lat": 26.10784,
    "lng": 79.02283
  },
  {
    "name": "Naduvannur, Kerala, India",
    "lat": 11.48772,
    "lng": 75.77511
  },
  {
    "name": "Naduvattam, Tamil Nadu, India",
    "lat": 11.48075,
    "lng": 76.54365
  },
  {
    "name": "Nagamangala, Karnataka, India",
    "lat": 12.81939,
    "lng": 76.75456
  },
  {
    "name": "Nagaon, Assam, India",
    "lat": 26.35037,
    "lng": 92.69225
  },
  {
    "name": "Nagapattinam, Tamil Nadu, India",
    "lat": 10.85,
    "lng": 79.74
  },
  {
    "name": "Nagapur, Maharashtra, India",
    "lat": 18.87,
    "lng": 76.43
  },
  {
    "name": "Nagar Karnul, Telangana, India",
    "lat": 16.4821,
    "lng": 78.32471
  },
  {
    "name": "Nagar, Himachal Pradesh, India",
    "lat": 32.13808,
    "lng": 77.17393
  },
  {
    "name": "Nagar, Rajasthan, India",
    "lat": 27.42397,
    "lng": 77.09922
  },
  {
    "name": "Nagari, Andhra Pradesh, India",
    "lat": 13.32139,
    "lng": 79.58557
  },
  {
    "name": "Nagarukhra, West Bengal, India",
    "lat": 22.94099,
    "lng": 88.63701
  },
  {
    "name": "Nagaur, Rajasthan, India",
    "lat": 27.20201,
    "lng": 73.73394
  },
  {
    "name": "Nagda, Madhya Pradesh, India",
    "lat": 23.45834,
    "lng": 75.41759
  },
  {
    "name": "Nagercoil, Tamil Nadu, India",
    "lat": 8.17899,
    "lng": 77.43227
  },
  {
    "name": "Nagina, Uttar Pradesh, India",
    "lat": 29.44433,
    "lng": 78.43646
  },
  {
    "name": "Nagireddipalli, Andhra Pradesh, India",
    "lat": 14.27005,
    "lng": 79.10131
  },
  {
    "name": "Nagla, Uttar Pradesh, India",
    "lat": 29.01,
    "lng": 79.51
  },
  {
    "name": "Nagod, Madhya Pradesh, India",
    "lat": 24.56924,
    "lng": 80.58809
  },
  {
    "name": "Nagothana, Maharashtra, India",
    "lat": 18.54225,
    "lng": 73.13493
  },
  {
    "name": "Nagpur Division, Maharashtra, India",
    "lat": 21.14911,
    "lng": 79.10748
  },
  {
    "name": "Nagpur, Maharashtra, India",
    "lat": 21.14631,
    "lng": 79.08491
  },
  {
    "name": "Nagrakata, West Bengal, India",
    "lat": 26.9,
    "lng": 88.9667
  },
  {
    "name": "Nagram, Uttar Pradesh, India",
    "lat": 26.61872,
    "lng": 81.14043
  },
  {
    "name": "Nagrota, Himachal Pradesh, India",
    "lat": 32.0571,
    "lng": 76.09139
  },
  {
    "name": "Nagwa, Gujarat, India",
    "lat": 25.69621,
    "lng": 84.2359
  },
  {
    "name": "Nahan, Himachal Pradesh, India",
    "lat": 30.56029,
    "lng": 77.29426
  },
  {
    "name": "Naharlagun, Arunachal Pradesh, India",
    "lat": 27.10467,
    "lng": 93.69518
  },
  {
    "name": "Nahorkatiya, Assam, India",
    "lat": 27.28912,
    "lng": 95.3418
  },
  {
    "name": "Naigarhi, Madhya Pradesh, India",
    "lat": 24.78686,
    "lng": 81.77868
  },
  {
    "name": "Naihati, West Bengal, India",
    "lat": 22.9,
    "lng": 88.42
  },
  {
    "name": "Naini Tal, Uttarakhand, India",
    "lat": 29.39743,
    "lng": 79.44686
  },
  {
    "name": "Nainpur, Madhya Pradesh, India",
    "lat": 22.42996,
    "lng": 80.10561
  },
  {
    "name": "Nainwa, Rajasthan, India",
    "lat": 25.77145,
    "lng": 75.84978
  },
  {
    "name": "Nairobi, Kenya",
    "lat": -1.2921,
    "lng": 36.8219
  },
  {
    "name": "Najafgarh, Delhi, India",
    "lat": 28.60922,
    "lng": 76.97982
  },
  {
    "name": "Najibabad, Uttar Pradesh, India",
    "lat": 29.61194,
    "lng": 78.34274
  },
  {
    "name": "Nakodar, Punjab, India",
    "lat": 31.12586,
    "lng": 75.47508
  },
  {
    "name": "Naksalbari, West Bengal, India",
    "lat": 26.68333333,
    "lng": 88.21666667
  },
  {
    "name": "Nakur, Uttar Pradesh, India",
    "lat": 29.91964,
    "lng": 77.30438
  },
  {
    "name": "Nala Sopara, Maharashtra, India",
    "lat": 19.4154,
    "lng": 72.8613
  },
  {
    "name": "Nalagarh, Himachal Pradesh, India",
    "lat": 31.04168,
    "lng": 76.72285
  },
  {
    "name": "Nalanda, Bihar, India",
    "lat": 25.25,
    "lng": 85.58333
  },
  {
    "name": "Nalbari, Assam, India",
    "lat": 26.5,
    "lng": 91.4
  },
  {
    "name": "Naldhara, Gujarat, India",
    "lat": 20.96666667,
    "lng": 73.16666667
  },
  {
    "name": "Naldurg, Maharashtra, India",
    "lat": 17.81667,
    "lng": 76.28182
  },
  {
    "name": "Nalegaon, Maharashtra, India",
    "lat": 18.41666667,
    "lng": 76.81666667
  },
  {
    "name": "Nalgonda, Telangana, India",
    "lat": 17.16667,
    "lng": 79.5
  },
  {
    "name": "Nalhati, West Bengal, India",
    "lat": 24.3,
    "lng": 87.82
  },
  {
    "name": "Naliya, Gujarat, India",
    "lat": 23.26058,
    "lng": 68.82655
  },
  {
    "name": "Nalpur, West Bengal, India",
    "lat": 22.53,
    "lng": 88.19
  },
  {
    "name": "Namagiripettai, Tamil Nadu, India",
    "lat": 11.45513,
    "lng": 78.26818
  },
  {
    "name": "Namakkal, Tamil Nadu, India",
    "lat": 11.3,
    "lng": 78.13
  },
  {
    "name": "Nambiyur, Tamil Nadu, India",
    "lat": 11.35811,
    "lng": 77.32115
  },
  {
    "name": "Nambutalai, Tamil Nadu, India",
    "lat": 9.72766,
    "lng": 79.00707
  },
  {
    "name": "Namchi, Sikkim, India",
    "lat": 27.16494,
    "lng": 88.3638
  },
  {
    "name": "Namkhana community development block, West Bengal, India",
    "lat": 21.7,
    "lng": 88.14
  },
  {
    "name": "Namli, Madhya Pradesh, India",
    "lat": 23.46115,
    "lng": 75.06036
  },
  {
    "name": "Nampur, Maharashtra, India",
    "lat": 20.72861111,
    "lng": 74.31083333
  },
  {
    "name": "Namrup, Assam, India",
    "lat": 27.19395,
    "lng": 95.31929
  },
  {
    "name": "Nanauta, Uttar Pradesh, India",
    "lat": 29.71215,
    "lng": 77.41728
  },
  {
    "name": "Nandambakkam, Tamil Nadu, India",
    "lat": 12.97795,
    "lng": 80.06781
  },
  {
    "name": "Nanded, Maharashtra, India",
    "lat": 18.91667,
    "lng": 77.5
  },
  {
    "name": "Nandgaon, Maharashtra, India",
    "lat": 20.3068,
    "lng": 74.65501
  },
  {
    "name": "Nandgaon, Uttar Pradesh, India",
    "lat": 27.71102,
    "lng": 77.38653
  },
  {
    "name": "Nandigama, Andhra Pradesh, India",
    "lat": 16.7717,
    "lng": 80.28596
  },
  {
    "name": "Nandigram, West Bengal, India",
    "lat": 22.01,
    "lng": 87.99
  },
  {
    "name": "Nandikotkur, Andhra Pradesh, India",
    "lat": 15.85668,
    "lng": 78.26569
  },
  {
    "name": "Nandnee, Maharashtra, India",
    "lat": 17.455,
    "lng": 75.84555556
  },
  {
    "name": "Nandura Buzurg, Maharashtra, India",
    "lat": 20.83417,
    "lng": 76.45924
  },
  {
    "name": "Nandura, Maharashtra, India",
    "lat": 20.83333333,
    "lng": 76.45972222
  },
  {
    "name": "Nandurbar, Maharashtra, India",
    "lat": 21.37,
    "lng": 74.2
  },
  {
    "name": "Nandyal, Andhra Pradesh, India",
    "lat": 15.47799,
    "lng": 78.4836
  },
  {
    "name": "Nangal, Punjab, India",
    "lat": 31.38966,
    "lng": 76.37574
  },
  {
    "name": "Nangavalli, Tamil Nadu, India",
    "lat": 11.76189,
    "lng": 77.89093
  },
  {
    "name": "Nangi, West Bengal, India",
    "lat": 22.50833333,
    "lng": 88.21527778
  },
  {
    "name": "Nangilickondan, Tamil Nadu, India",
    "lat": 12.25539,
    "lng": 79.47508
  },
  {
    "name": "Nangloi Jat, Delhi, India",
    "lat": 28.67957,
    "lng": 77.06799
  },
  {
    "name": "Nanguneri, Tamil Nadu, India",
    "lat": 8.49326,
    "lng": 77.65806
  },
  {
    "name": "Nanjangud, Karnataka, India",
    "lat": 12.11764,
    "lng": 76.68397
  },
  {
    "name": "Nannilam, Tamil Nadu, India",
    "lat": 10.87933,
    "lng": 79.61062
  },
  {
    "name": "Nanpara, Uttar Pradesh, India",
    "lat": 27.86459,
    "lng": 81.50036
  },
  {
    "name": "Napasar, Rajasthan, India",
    "lat": 27.96059,
    "lng": 73.55913
  },
  {
    "name": "Naraina, Rajasthan, India",
    "lat": 26.79069,
    "lng": 75.20608
  },
  {
    "name": "Naraini, Madhya Pradesh, India",
    "lat": 25.19033,
    "lng": 80.475
  },
  {
    "name": "Narasannapeta, Andhra Pradesh, India",
    "lat": 18.41428,
    "lng": 84.04463
  },
  {
    "name": "Narasapur, Andhra Pradesh, India",
    "lat": 16.43425,
    "lng": 81.69845
  },
  {
    "name": "Narasaraopet, Andhra Pradesh, India",
    "lat": 16.23488,
    "lng": 80.04927
  },
  {
    "name": "Narasimharajapura, Karnataka, India",
    "lat": 13.61075,
    "lng": 75.512
  },
  {
    "name": "Narasingapuram, Andhra Pradesh, India",
    "lat": 13.60759,
    "lng": 79.31652
  },
  {
    "name": "Narauli, Uttar Pradesh, India",
    "lat": 28.48547,
    "lng": 78.71484
  },
  {
    "name": "Naraura, Uttar Pradesh, India",
    "lat": 28.20147,
    "lng": 78.38723
  },
  {
    "name": "Naravarikuppam, Tamil Nadu, India",
    "lat": 13.19133,
    "lng": 80.18473
  },
  {
    "name": "Narayanavanam, Andhra Pradesh, India",
    "lat": 13.42565,
    "lng": 79.58881
  },
  {
    "name": "Narayangaon, Maharashtra, India",
    "lat": 19.07,
    "lng": 73.97
  },
  {
    "name": "Narayangarh, Haryana, India",
    "lat": 30.47798,
    "lng": 77.12804
  },
  {
    "name": "Narayangarh, Madhya Pradesh, India",
    "lat": 24.27083,
    "lng": 75.05007
  },
  {
    "name": "Narayanpet, Telangana, India",
    "lat": 16.74799,
    "lng": 77.4954
  },
  {
    "name": "Narayanpur, Chhattisgarh, India",
    "lat": 19.60426,
    "lng": 81.08119
  },
  {
    "name": "Nardana, Maharashtra, India",
    "lat": 21.2,
    "lng": 74.81666667
  },
  {
    "name": "Naregal, Karnataka, India",
    "lat": 15.57316,
    "lng": 75.80805
  },
  {
    "name": "Narela, Delhi, India",
    "lat": 28.85267,
    "lng": 77.09288
  },
  {
    "name": "Narendranagar, Uttarakhand, India",
    "lat": 30.16173,
    "lng": 78.28712
  },
  {
    "name": "Nargol, Gujarat, India",
    "lat": 20.233,
    "lng": 72.75
  },
  {
    "name": "Nargund, Karnataka, India",
    "lat": 15.72299,
    "lng": 75.38666
  },
  {
    "name": "Narharpur, Chhattisgarh, India",
    "lat": 20.44892,
    "lng": 81.62004
  },
  {
    "name": "Nariman Point, Maharashtra, India",
    "lat": 18.92,
    "lng": 72.83
  },
  {
    "name": "Narkhed, Maharashtra, India",
    "lat": 21.47,
    "lng": 78.53
  },
  {
    "name": "Narmada, Gujarat, India",
    "lat": 21.87377,
    "lng": 73.49527
  },
  {
    "name": "Narnaul, Haryana, India",
    "lat": 28.04444,
    "lng": 76.10833
  },
  {
    "name": "Narnaund, Haryana, India",
    "lat": 29.22047,
    "lng": 76.14278
  },
  {
    "name": "Naroda, Gujarat, India",
    "lat": 23.07041,
    "lng": 72.65702
  },
  {
    "name": "Narora, Uttar Pradesh, India",
    "lat": 28.19666667,
    "lng": 78.38138889
  },
  {
    "name": "Narsimhapur, Madhya Pradesh, India",
    "lat": 22.91667,
    "lng": 79.16667
  },
  {
    "name": "Narsinghgarh, Madhya Pradesh, India",
    "lat": 23.70758,
    "lng": 77.09319
  },
  {
    "name": "Narsingi, Telangana, India",
    "lat": 18.04468,
    "lng": 78.42516
  },
  {
    "name": "Narsipatnam, Andhra Pradesh, India",
    "lat": 17.66709,
    "lng": 82.61245
  },
  {
    "name": "Narwana, Haryana, India",
    "lat": 29.59903,
    "lng": 76.11927
  },
  {
    "name": "Narwar, Madhya Pradesh, India",
    "lat": 25.6439,
    "lng": 77.9129
  },
  {
    "name": "Nashik Division, Maharashtra, India",
    "lat": 19.98295,
    "lng": 73.78942
  },
  {
    "name": "Nashik, Maharashtra, India",
    "lat": 19.99727,
    "lng": 73.79096
  },
  {
    "name": "Nasirabad, Rajasthan, India",
    "lat": 26.30473,
    "lng": 74.73364
  },
  {
    "name": "Naspur, Telangana, India",
    "lat": 18.84577,
    "lng": 79.46165
  },
  {
    "name": "Nasriganj, Bihar, India",
    "lat": 25.0514,
    "lng": 84.32839
  },
  {
    "name": "Nasrullahganj, Madhya Pradesh, India",
    "lat": 22.6837,
    "lng": 77.27069
  },
  {
    "name": "Nathdwara, Rajasthan, India",
    "lat": 24.93805,
    "lng": 73.82392
  },
  {
    "name": "Nattam, Tamil Nadu, India",
    "lat": 10.22776,
    "lng": 78.22969
  },
  {
    "name": "Nattarasankottai, Tamil Nadu, India",
    "lat": 9.86905,
    "lng": 78.55305
  },
  {
    "name": "Naugachhia, Bihar, India",
    "lat": 25.38807,
    "lng": 87.09906
  },
  {
    "name": "Naugama, Uttar Pradesh, India",
    "lat": 27.7,
    "lng": 79.65
  },
  {
    "name": "Naurangpur, Uttar Pradesh, India",
    "lat": 27.16666667,
    "lng": 79.78333333
  },
  {
    "name": "Nautanwa, Uttar Pradesh, India",
    "lat": 27.42752,
    "lng": 83.41789
  },
  {
    "name": "Navalgund, Karnataka, India",
    "lat": 15.55877,
    "lng": 75.35305
  },
  {
    "name": "Navapur, Maharashtra, India",
    "lat": 21.17,
    "lng": 73.78
  },
  {
    "name": "Navelim, Goa, India",
    "lat": 15.53333,
    "lng": 73.98333
  },
  {
    "name": "Navi Mumbai, Maharashtra, India",
    "lat": 19.03681,
    "lng": 73.01582
  },
  {
    "name": "Navsari, Gujarat, India",
    "lat": 20.95,
    "lng": 72.92
  },
  {
    "name": "Nawa, Rajasthan, India",
    "lat": 27.0195,
    "lng": 75.00226
  },
  {
    "name": "Nawabganj (Barabanki), Uttar Pradesh, India",
    "lat": 26.94,
    "lng": 81.19
  },
  {
    "name": "Nawabganj (Bareilly), Uttar Pradesh, India",
    "lat": 28.54,
    "lng": 79.633
  },
  {
    "name": "Nawabganj, Uttar Pradesh, India",
    "lat": 26.93129,
    "lng": 81.19841
  },
  {
    "name": "Nawada, Bihar, India",
    "lat": 24.75,
    "lng": 85.5
  },
  {
    "name": "Nawalgarh, Rajasthan, India",
    "lat": 27.85161,
    "lng": 75.27384
  },
  {
    "name": "Nawanshahr, Jammu and Kashmir, India",
    "lat": 32.76505,
    "lng": 74.52772
  },
  {
    "name": "Nawanshahr, Punjab, India",
    "lat": 31.1245,
    "lng": 76.11613
  },
  {
    "name": "Naya Bazar, Sikkim, India",
    "lat": 27.13082,
    "lng": 88.23972
  },
  {
    "name": "Nayagarh District, Odisha, India",
    "lat": 20.13,
    "lng": 85.1
  },
  {
    "name": "Nayagarh, Odisha, India",
    "lat": 20.12882,
    "lng": 85.09626
  },
  {
    "name": "Nayagram community development block, West Bengal, India",
    "lat": 22.0319,
    "lng": 87.1781
  },
  {
    "name": "Nayudupet, Andhra Pradesh, India",
    "lat": 13.90742,
    "lng": 79.89465
  },
  {
    "name": "Nazira, Assam, India",
    "lat": 26.91649,
    "lng": 94.73611
  },
  {
    "name": "Nedumangad, Kerala, India",
    "lat": 8.60267,
    "lng": 77.00139
  },
  {
    "name": "Needamangalam, Tamil Nadu, India",
    "lat": 10.77378,
    "lng": 79.41875
  },
  {
    "name": "Neelankarai, Tamil Nadu, India",
    "lat": 12.9495,
    "lng": 80.2592
  },
  {
    "name": "Neem ka Thana, Rajasthan, India",
    "lat": 27.73976,
    "lng": 75.78652
  },
  {
    "name": "Neemuch, Madhya Pradesh, India",
    "lat": 24.47,
    "lng": 74.87
  },
  {
    "name": "Negapatam, Tamil Nadu, India",
    "lat": 10.76377,
    "lng": 79.84313
  },
  {
    "name": "Nelamangala, Karnataka, India",
    "lat": 13.09978,
    "lng": 77.39364
  },
  {
    "name": "Nellikkuppam, Tamil Nadu, India",
    "lat": 11.77554,
    "lng": 79.67016
  },
  {
    "name": "Nellore, Andhra Pradesh, India",
    "lat": 14.08333,
    "lng": 79.58333
  },
  {
    "name": "Nepanagar, Madhya Pradesh, India",
    "lat": 21.4538,
    "lng": 76.39335
  },
  {
    "name": "Neral, Maharashtra, India",
    "lat": 19.02475,
    "lng": 73.31688
  },
  {
    "name": "Nerur, Maharashtra, India",
    "lat": 15.98333333,
    "lng": 73.65
  },
  {
    "name": "Neturhat, Jharkhand, India",
    "lat": 23.47457,
    "lng": 84.2678
  },
  {
    "name": "Nevasa, Maharashtra, India",
    "lat": 19.53333333,
    "lng": 74.93333333
  },
  {
    "name": "New Delhi, Delhi, India",
    "lat": 28.63576,
    "lng": 77.22445
  },
  {
    "name": "New York, NY, USA",
    "lat": 40.7128,
    "lng": -74.006
  },
  {
    "name": "Newara, Uttar Pradesh, India",
    "lat": 27.76666667,
    "lng": 79.28333333
  },
  {
    "name": "Neyyattinkara, Kerala, India",
    "lat": 8.39854,
    "lng": 77.08586
  },
  {
    "name": "Nichlaul, Uttar Pradesh, India",
    "lat": 27.31247,
    "lng": 83.7253
  },
  {
    "name": "Nicobar, Andaman and Nicobar Islands, India",
    "lat": 7.03002,
    "lng": 93.79028
  },
  {
    "name": "Nidadavole, Andhra Pradesh, India",
    "lat": 16.90572,
    "lng": 81.67222
  },
  {
    "name": "Nighoj, Maharashtra, India",
    "lat": 18.95972222,
    "lng": 74.27694444
  },
  {
    "name": "Nigoh, Uttar Pradesh, India",
    "lat": 26.75,
    "lng": 79.15
  },
  {
    "name": "Nihtaur, Uttar Pradesh, India",
    "lat": 29.32416,
    "lng": 78.38724
  },
  {
    "name": "Nikora, Gujarat, India",
    "lat": 21.78586,
    "lng": 73.13968
  },
  {
    "name": "Nilakottai, Tamil Nadu, India",
    "lat": 10.165,
    "lng": 77.85024
  },
  {
    "name": "Nilanga, Maharashtra, India",
    "lat": 18.11675,
    "lng": 76.75279
  },
  {
    "name": "Nileshwar, Kerala, India",
    "lat": 12.25953,
    "lng": 75.1352
  },
  {
    "name": "Nilgiri, Odisha, India",
    "lat": 21.46235,
    "lng": 86.76794
  },
  {
    "name": "Nilgiris, Tamil Nadu, India",
    "lat": 11.46,
    "lng": 76.64
  },
  {
    "name": "Nilokheri, Haryana, India",
    "lat": 29.83671,
    "lng": 76.93191
  },
  {
    "name": "Nimaj, Rajasthan, India",
    "lat": 26.14995,
    "lng": 74.00094
  },
  {
    "name": "Nimaparha, Odisha, India",
    "lat": 20.05756,
    "lng": 86.00436
  },
  {
    "name": "Nimbahera, Rajasthan, India",
    "lat": 24.62166,
    "lng": 74.67999
  },
  {
    "name": "Nipani, Maharashtra, India",
    "lat": 16.399,
    "lng": 74.38285
  },
  {
    "name": "Niphad, Maharashtra, India",
    "lat": 20.0833,
    "lng": 73.8
  },
  {
    "name": "Nira Narsingpur, Maharashtra, India",
    "lat": 17.9835,
    "lng": 75.12396
  },
  {
    "name": "Nirmal, Telangana, India",
    "lat": 19.09685,
    "lng": 78.34407
  },
  {
    "name": "Nirmali, Bihar, India",
    "lat": 26.31397,
    "lng": 86.58537
  },
  {
    "name": "Nirsa, Jharkhand, India",
    "lat": 23.78438,
    "lng": 86.70692
  },
  {
    "name": "Niwai, Rajasthan, India",
    "lat": 26.36073,
    "lng": 75.91836
  },
  {
    "name": "Niwari, Uttar Pradesh, India",
    "lat": 28.87611,
    "lng": 77.5382
  },
  {
    "name": "Nizamabad, Telangana, India",
    "lat": 18.75,
    "lng": 78.25
  },
  {
    "name": "Nizamabad, Uttar Pradesh, India",
    "lat": 26.05295,
    "lng": 83.05787
  },
  {
    "name": "Nizar, Gujarat, India",
    "lat": 21.47727,
    "lng": 74.19595
  },
  {
    "name": "Noamundi, Jharkhand, India",
    "lat": 22.16094,
    "lng": 85.50416
  },
  {
    "name": "Nohar, Rajasthan, India",
    "lat": 29.18292,
    "lng": 74.77064
  },
  {
    "name": "Noida, Uttar Pradesh, India",
    "lat": 28.58,
    "lng": 77.33
  },
  {
    "name": "Nokha, Rajasthan, India",
    "lat": 27.56155,
    "lng": 73.47141
  },
  {
    "name": "Noney, Manipur, India",
    "lat": 24.8491131,
    "lng": 93.5967366
  },
  {
    "name": "Nongpoh, Meghalaya, India",
    "lat": 25.9023,
    "lng": 91.87694
  },
  {
    "name": "Nongstoin, Meghalaya, India",
    "lat": 25.51704,
    "lng": 91.26484
  },
  {
    "name": "Noria, Jammu and Kashmir, India",
    "lat": 32.52095,
    "lng": 74.79845
  },
  {
    "name": "North 24 Parganas, West Bengal, India",
    "lat": 22.13,
    "lng": 88.5
  },
  {
    "name": "North Delhi, Delhi, India",
    "lat": 28.6692,
    "lng": 77.22273
  },
  {
    "name": "North East Delhi, Delhi, India",
    "lat": 28.6869,
    "lng": 77.30195
  },
  {
    "name": "North Garo Hills, Meghalaya, India",
    "lat": 25.89682,
    "lng": 90.61602
  },
  {
    "name": "North Goa, Goa, India",
    "lat": 15.53397,
    "lng": 73.96408
  },
  {
    "name": "North Guwahati, Assam, India",
    "lat": 26.19749,
    "lng": 91.7202
  },
  {
    "name": "North Lakhimpur, Assam, India",
    "lat": 27.23517,
    "lng": 94.10357
  },
  {
    "name": "North Tripura, Tripura, India",
    "lat": 24.1305,
    "lng": 92.15552
  },
  {
    "name": "North Vanlaiphai, Mizoram, India",
    "lat": 23.13227,
    "lng": 93.06532
  },
  {
    "name": "North West Delhi, Delhi, India",
    "lat": 28.70113,
    "lng": 77.10154
  },
  {
    "name": "North, Sikkim, India",
    "lat": 27.66667,
    "lng": 88.5
  },
  {
    "name": "Nowrangapur, Odisha, India",
    "lat": 19.23114,
    "lng": 82.54826
  },
  {
    "name": "Nuapada, Odisha, India",
    "lat": 20.6,
    "lng": 82.5
  },
  {
    "name": "Nuh, Haryana, India",
    "lat": 28.10296,
    "lng": 77.00144
  },
  {
    "name": "Numaligarh, Assam, India",
    "lat": 26.62249,
    "lng": 93.72225
  },
  {
    "name": "Nurmahal, Punjab, India",
    "lat": 31.09662,
    "lng": 75.59386
  },
  {
    "name": "Nurpur Kalan, Punjab, India",
    "lat": 31.16667,
    "lng": 76.48333
  },
  {
    "name": "Nurpur, Uttar Pradesh, India",
    "lat": 29.14956,
    "lng": 78.4084
  },
  {
    "name": "Nuzvid, Andhra Pradesh, India",
    "lat": 16.78854,
    "lng": 80.84593
  },
  {
    "name": "Nyamti, Karnataka, India",
    "lat": 14.14869,
    "lng": 75.57641
  },
  {
    "name": "Obra, Uttar Pradesh, India",
    "lat": 24.41863,
    "lng": 82.98797
  },
  {
    "name": "Odadar, Gujarat, India",
    "lat": 21.56666667,
    "lng": 69.66666667
  },
  {
    "name": "Odlabari, West Bengal, India",
    "lat": 26.83638889,
    "lng": 88.62944444
  },
  {
    "name": "Odugattur, Tamil Nadu, India",
    "lat": 12.76793,
    "lng": 78.88304
  },
  {
    "name": "Okha, Gujarat, India",
    "lat": 22.46756,
    "lng": 69.07002
  },
  {
    "name": "Olpad, Gujarat, India",
    "lat": 21.33649,
    "lng": 72.75161
  },
  {
    "name": "Omalur, Tamil Nadu, India",
    "lat": 11.74099,
    "lng": 78.04559
  },
  {
    "name": "Ongole, Andhra Pradesh, India",
    "lat": 15.50357,
    "lng": 80.04454
  },
  {
    "name": "Ooty, Tamil Nadu, India",
    "lat": 11.4134,
    "lng": 76.69521
  },
  {
    "name": "Orai, Uttar Pradesh, India",
    "lat": 25.99023,
    "lng": 79.45334
  },
  {
    "name": "Oran, Uttar Pradesh, India",
    "lat": 25.36882,
    "lng": 80.7423
  },
  {
    "name": "Orchha, Madhya Pradesh, India",
    "lat": 25.35192,
    "lng": 78.64033
  },
  {
    "name": "Osaka, Japan",
    "lat": 34.6937,
    "lng": 135.5022
  },
  {
    "name": "Osmanabad, Maharashtra, India",
    "lat": 18.25,
    "lng": 76.16667
  },
  {
    "name": "Ottappalam, Kerala, India",
    "lat": 10.7735,
    "lng": 76.37758
  },
  {
    "name": "Ozar, Maharashtra, India",
    "lat": 20.09473,
    "lng": 73.92816
  },
  {
    "name": "Pabal, Maharashtra, India",
    "lat": 18.83083333,
    "lng": 74.05277778
  },
  {
    "name": "Pachmarhi, Madhya Pradesh, India",
    "lat": 22.46791,
    "lng": 78.43312
  },
  {
    "name": "Pachora, Maharashtra, India",
    "lat": 20.66727,
    "lng": 75.35305
  },
  {
    "name": "Pachperwa, Uttar Pradesh, India",
    "lat": 27.51234,
    "lng": 82.64297
  },
  {
    "name": "Padam, Jammu and Kashmir, India",
    "lat": 33.46659,
    "lng": 76.88488
  },
  {
    "name": "Padampur, Odisha, India",
    "lat": 20.99932,
    "lng": 83.06325
  },
  {
    "name": "Padampur, Rajasthan, India",
    "lat": 29.70885,
    "lng": 73.62539
  },
  {
    "name": "Paddhari, Gujarat, India",
    "lat": 22.43654,
    "lng": 70.60162
  },
  {
    "name": "Padmanabhapuram, Tamil Nadu, India",
    "lat": 8.24462,
    "lng": 77.32581
  },
  {
    "name": "Padra, Gujarat, India",
    "lat": 22.2398,
    "lng": 73.08451
  },
  {
    "name": "Padrauna, Uttar Pradesh, India",
    "lat": 26.90403,
    "lng": 83.98087
  },
  {
    "name": "Pahasu, Uttar Pradesh, India",
    "lat": 28.1722,
    "lng": 78.06376
  },
  {
    "name": "Pahlgam, Jammu and Kashmir, India",
    "lat": 34.01592,
    "lng": 75.31899
  },
  {
    "name": "Pahur Maharashtra, Maharashtra, India",
    "lat": 20.7,
    "lng": 75.68333333
  },
  {
    "name": "Paigaon, Uttar Pradesh, India",
    "lat": 27.78333333,
    "lng": 77.53333333
  },
  {
    "name": "Paikpara, West Bengal, India",
    "lat": 24.77121,
    "lng": 87.92251
  },
  {
    "name": "Paithan, Maharashtra, India",
    "lat": 19.47506,
    "lng": 75.38558
  },
  {
    "name": "Pakala, Andhra Pradesh, India",
    "lat": 13.44903,
    "lng": 79.11493
  },
  {
    "name": "Pakur, Jharkhand, India",
    "lat": 24.63925,
    "lng": 87.84239
  },
  {
    "name": "Palackattumala, Kerala, India",
    "lat": 9.74356,
    "lng": 76.6294
  },
  {
    "name": "Palakkad, Kerala, India",
    "lat": 10.775,
    "lng": 76.651
  },
  {
    "name": "Palakkodu, Tamil Nadu, India",
    "lat": 12.30696,
    "lng": 78.07022
  },
  {
    "name": "Palakollu, Andhra Pradesh, India",
    "lat": 16.5167,
    "lng": 81.73
  },
  {
    "name": "Palamedu, Tamil Nadu, India",
    "lat": 10.10501,
    "lng": 78.11336
  },
  {
    "name": "Palampur, Himachal Pradesh, India",
    "lat": 32.11453,
    "lng": 76.55681
  },
  {
    "name": "Palamu, Jharkhand, India",
    "lat": 23.91667,
    "lng": 84.08333
  },
  {
    "name": "Palani, Tamil Nadu, India",
    "lat": 10.45034,
    "lng": 77.5209
  },
  {
    "name": "Palanpur, Gujarat, India",
    "lat": 24.17128,
    "lng": 72.43827
  },
  {
    "name": "Palanswa, Gujarat, India",
    "lat": 23.46666667,
    "lng": 70.93333333
  },
  {
    "name": "Palasa, Andhra Pradesh, India",
    "lat": 18.77257,
    "lng": 84.41012
  },
  {
    "name": "Palasbari, Assam, India",
    "lat": 26.12388,
    "lng": 91.53974
  },
  {
    "name": "Palavakkam, Tamil Nadu, India",
    "lat": 12.9535,
    "lng": 80.2572
  },
  {
    "name": "Palera, Madhya Pradesh, India",
    "lat": 25.02013,
    "lng": 79.22818
  },
  {
    "name": "Palghar, Maharashtra, India",
    "lat": 19.69693,
    "lng": 72.76543
  },
  {
    "name": "Palghat, Kerala, India",
    "lat": 10.77319,
    "lng": 76.65366
  },
  {
    "name": "Pali Raigad, Maharashtra, India",
    "lat": 18.541384,
    "lng": 73.219965
  },
  {
    "name": "Pali, Madhya Pradesh, India",
    "lat": 23.36453,
    "lng": 81.04374
  },
  {
    "name": "Pali, Rajasthan, India",
    "lat": 25.77276,
    "lng": 73.32335
  },
  {
    "name": "Pali, Uttar Pradesh, India",
    "lat": 24.49188,
    "lng": 78.41617
  },
  {
    "name": "Palia Kalan, Uttar Pradesh, India",
    "lat": 28.43205,
    "lng": 80.58137
  },
  {
    "name": "Palitana, Gujarat, India",
    "lat": 21.52519,
    "lng": 71.82309
  },
  {
    "name": "Paliyad, Gujarat, India",
    "lat": 22.25757,
    "lng": 71.56024
  },
  {
    "name": "Palkonda, Andhra Pradesh, India",
    "lat": 18.60374,
    "lng": 83.75568
  },
  {
    "name": "Palladam, Tamil Nadu, India",
    "lat": 10.99175,
    "lng": 77.28633
  },
  {
    "name": "Pallappatti, Tamil Nadu, India",
    "lat": 10.72057,
    "lng": 77.87951
  },
  {
    "name": "Pallattur, Tamil Nadu, India",
    "lat": 10.14609,
    "lng": 78.80309
  },
  {
    "name": "Pallavaram, Tamil Nadu, India",
    "lat": 12.96796,
    "lng": 80.15025
  },
  {
    "name": "Palle, Goa, India",
    "lat": 15.46667,
    "lng": 74.08333
  },
  {
    "name": "Pallevada, Andhra Pradesh, India",
    "lat": 16.5779,
    "lng": 81.29463
  },
  {
    "name": "Pallikondai, Tamil Nadu, India",
    "lat": 12.90518,
    "lng": 78.9427
  },
  {
    "name": "Pallipattu, Tamil Nadu, India",
    "lat": 13.3386,
    "lng": 79.44489
  },
  {
    "name": "Pallippatti, Tamil Nadu, India",
    "lat": 11.9399,
    "lng": 78.40161
  },
  {
    "name": "Palmaner, Andhra Pradesh, India",
    "lat": 13.2,
    "lng": 78.74725
  },
  {
    "name": "Paloncha, Telangana, India",
    "lat": 17.60184,
    "lng": 80.70509
  },
  {
    "name": "Palsana, Gujarat, India",
    "lat": 21.08,
    "lng": 72.98
  },
  {
    "name": "Palso, Maharashtra, India",
    "lat": 20.76666667,
    "lng": 77.23333333
  },
  {
    "name": "Palwal, Haryana, India",
    "lat": 28.14469,
    "lng": 77.32546
  },
  {
    "name": "Palwancha, Telangana, India",
    "lat": 17.58152,
    "lng": 80.67651
  },
  {
    "name": "Panagar, Madhya Pradesh, India",
    "lat": 23.28539,
    "lng": 79.99509
  },
  {
    "name": "Panagarh, West Bengal, India",
    "lat": 23.45,
    "lng": 87.43
  },
  {
    "name": "Panaji, Goa, India",
    "lat": 15.49574,
    "lng": 73.82624
  },
  {
    "name": "Panamaram, Kerala, India",
    "lat": 11.74014,
    "lng": 76.07369
  },
  {
    "name": "Panara, Madhya Pradesh, India",
    "lat": 22.20568,
    "lng": 78.55093
  },
  {
    "name": "Panch Mahals, Gujarat, India",
    "lat": 23,
    "lng": 74
  },
  {
    "name": "Panchgani, Maharashtra, India",
    "lat": 17.92449,
    "lng": 73.8008
  },
  {
    "name": "Panchkula, Haryana, India",
    "lat": 30.72883,
    "lng": 76.94716
  },
  {
    "name": "Panchla, West Bengal, India",
    "lat": 22.54,
    "lng": 88.14
  },
  {
    "name": "Panchmahal, Gujarat, India",
    "lat": 22.6978098,
    "lng": 73.5980682
  },
  {
    "name": "Panchmura, West Bengal, India",
    "lat": 22.9667,
    "lng": 87.1667
  },
  {
    "name": "Pandaria, Chhattisgarh, India",
    "lat": 22.22495,
    "lng": 81.40994
  },
  {
    "name": "Pandatarai, Chhattisgarh, India",
    "lat": 22.18714,
    "lng": 81.32815
  },
  {
    "name": "Pandhana, Madhya Pradesh, India",
    "lat": 21.69816,
    "lng": 76.22487
  },
  {
    "name": "Pandharpur, Maharashtra, India",
    "lat": 17.67924,
    "lng": 75.33098
  },
  {
    "name": "Pandhurli, Maharashtra, India",
    "lat": 19.829052,
    "lng": 73.854745
  },
  {
    "name": "Pandhurna, Madhya Pradesh, India",
    "lat": 21.59556,
    "lng": 78.52628
  },
  {
    "name": "Pandoh, Himachal Pradesh, India",
    "lat": 31.66902,
    "lng": 77.05359
  },
  {
    "name": "Pandua, West Bengal, India",
    "lat": 23.08,
    "lng": 88.28
  },
  {
    "name": "Pangala, Karnataka, India",
    "lat": 13.25,
    "lng": 74.75
  },
  {
    "name": "Panhala, Maharashtra, India",
    "lat": 16.8121,
    "lng": 74.11007
  },
  {
    "name": "Panihati, West Bengal, India",
    "lat": 22.69,
    "lng": 88.37
  },
  {
    "name": "Panipat, Haryana, India",
    "lat": 29.33259,
    "lng": 76.92634
  },
  {
    "name": "Panna, Madhya Pradesh, India",
    "lat": 24.5,
    "lng": 80.25
  },
  {
    "name": "Panruti, Tamil Nadu, India",
    "lat": 11.77662,
    "lng": 79.55269
  },
  {
    "name": "Pansemal, Madhya Pradesh, India",
    "lat": 21.65981,
    "lng": 74.69937
  },
  {
    "name": "Panskura, West Bengal, India",
    "lat": 22.42,
    "lng": 87.7
  },
  {
    "name": "Panvel, Maharashtra, India",
    "lat": 18.98878,
    "lng": 73.11013
  },
  {
    "name": "Paonta Sahib, Himachal Pradesh, India",
    "lat": 30.43666,
    "lng": 77.62462
  },
  {
    "name": "Papanasam, Tamil Nadu, India",
    "lat": 10.92687,
    "lng": 79.27056
  },
  {
    "name": "Papireddippatti, Tamil Nadu, India",
    "lat": 11.91774,
    "lng": 78.36865
  },
  {
    "name": "Papparappatti, Tamil Nadu, India",
    "lat": 12.22086,
    "lng": 78.0592
  },
  {
    "name": "Pappinissheri, Kerala, India",
    "lat": 11.95655,
    "lng": 75.34034
  },
  {
    "name": "Paradip Garh, Odisha, India",
    "lat": 20.31641,
    "lng": 86.6085
  },
  {
    "name": "Paramagudi, Tamil Nadu, India",
    "lat": 9.54633,
    "lng": 78.5907
  },
  {
    "name": "Paras Rampur, Uttar Pradesh, India",
    "lat": 31.32388889,
    "lng": 75.67472222
  },
  {
    "name": "Parasia, Madhya Pradesh, India",
    "lat": 22.1913,
    "lng": 78.75904
  },
  {
    "name": "Paravur Tekkumbhagam, Kerala, India",
    "lat": 8.7947,
    "lng": 76.66798
  },
  {
    "name": "Parbatipur, West Bengal, India",
    "lat": 22.6625,
    "lng": 88.22222
  },
  {
    "name": "Parbhani, Maharashtra, India",
    "lat": 19.5,
    "lng": 76.75
  },
  {
    "name": "Pardi, Gujarat, India",
    "lat": 20.5087,
    "lng": 72.94569
  },
  {
    "name": "Parel, Maharashtra, India",
    "lat": 18.99,
    "lng": 72.84
  },
  {
    "name": "Parichha, Uttar Pradesh, India",
    "lat": 25.50789,
    "lng": 78.75954
  },
  {
    "name": "Parichhatgarh, Uttar Pradesh, India",
    "lat": 28.97841,
    "lng": 77.93422
  },
  {
    "name": "Paris, France",
    "lat": 48.8566,
    "lng": 2.3522
  },
  {
    "name": "Pariyapuram, Kerala, India",
    "lat": 11.01667,
    "lng": 75.86667
  },
  {
    "name": "Parlakimidi, Andhra Pradesh, India",
    "lat": 18.78113,
    "lng": 84.08836
  },
  {
    "name": "Parli Vaijnath, Maharashtra, India",
    "lat": 18.85057,
    "lng": 76.53163
  },
  {
    "name": "Parner, Maharashtra, India",
    "lat": 19.003,
    "lng": 74.438
  },
  {
    "name": "Parnera, Gujarat, India",
    "lat": 20.56101,
    "lng": 72.94846
  },
  {
    "name": "Parol, Jammu and Kashmir, India",
    "lat": 32.34598,
    "lng": 75.43441
  },
  {
    "name": "Parola, Maharashtra, India",
    "lat": 20.88098,
    "lng": 75.11937
  },
  {
    "name": "Parseoni, Maharashtra, India",
    "lat": 21.38333333,
    "lng": 79.15
  },
  {
    "name": "Parshadepur, Uttar Pradesh, India",
    "lat": 26.07354,
    "lng": 81.49207
  },
  {
    "name": "Partapur, Rajasthan, India",
    "lat": 23.59276,
    "lng": 74.17396
  },
  {
    "name": "Partur, Maharashtra, India",
    "lat": 19.59925,
    "lng": 76.21541
  },
  {
    "name": "Parvatipuram, Andhra Pradesh, India",
    "lat": 18.78392,
    "lng": 83.42569
  },
  {
    "name": "Parvatsar, Rajasthan, India",
    "lat": 26.88604,
    "lng": 74.76602
  },
  {
    "name": "Parwanoo, Himachal Pradesh, India",
    "lat": 30.83716,
    "lng": 76.96143
  },
  {
    "name": "Pasan, Chhattisgarh, India",
    "lat": 22.84412,
    "lng": 82.19823
  },
  {
    "name": "Paschim Medinipur, West Bengal, India",
    "lat": 22.3600118,
    "lng": 87.4111505
  },
  {
    "name": "Pashchim Champaran, Bihar, India",
    "lat": 27,
    "lng": 84.5
  },
  {
    "name": "Pashchim Singhbhum, Jharkhand, India",
    "lat": 22.5,
    "lng": 85.5
  },
  {
    "name": "Pasighat, Arunachal Pradesh, India",
    "lat": 28.06631,
    "lng": 95.32678
  },
  {
    "name": "patamda, Jharkhand, India",
    "lat": 24.3,
    "lng": 85.41667
  },
  {
    "name": "Patamundai, Odisha, India",
    "lat": 20.57806,
    "lng": 86.56063
  },
  {
    "name": "Patan, Chhattisgarh, India",
    "lat": 21.03333,
    "lng": 81.53333
  },
  {
    "name": "Patan, Gujarat, India",
    "lat": 23.7,
    "lng": 71.8
  },
  {
    "name": "Patan, Madhya Pradesh, India",
    "lat": 23.28636,
    "lng": 79.68962
  },
  {
    "name": "Patan, Maharashtra, India",
    "lat": 17.37513,
    "lng": 73.90143
  },
  {
    "name": "Patancheru, Telangana, India",
    "lat": 17.53334,
    "lng": 78.2645
  },
  {
    "name": "Pataudi, Haryana, India",
    "lat": 28.32547,
    "lng": 76.77858
  },
  {
    "name": "Pathakpura, Uttar Pradesh, India",
    "lat": 26.84441,
    "lng": 78.74037
  },
  {
    "name": "Pathalgaon, Chhattisgarh, India",
    "lat": 22.55656,
    "lng": 83.46355
  },
  {
    "name": "Pathanamthitta, Kerala, India",
    "lat": 9.26667,
    "lng": 76.78333
  },
  {
    "name": "Pathankot, Punjab, India",
    "lat": 32.27484,
    "lng": 75.65287
  },
  {
    "name": "Pathardi, Maharashtra, India",
    "lat": 19.17279,
    "lng": 75.17425
  },
  {
    "name": "Pathardih, Jharkhand, India",
    "lat": 23.6658,
    "lng": 86.43166
  },
  {
    "name": "Patharia, Madhya Pradesh, India",
    "lat": 23.89921,
    "lng": 79.19393
  },
  {
    "name": "Pathri, Maharashtra, India",
    "lat": 19.2588,
    "lng": 76.43412
  },
  {
    "name": "Patiala, Punjab, India",
    "lat": 30.33625,
    "lng": 76.3922
  },
  {
    "name": "Patiali, Uttar Pradesh, India",
    "lat": 27.69086,
    "lng": 78.99823
  },
  {
    "name": "Patiram, West Bengal, India",
    "lat": 25.31666667,
    "lng": 88.75
  },
  {
    "name": "Patna, Bihar, India",
    "lat": 25.41667,
    "lng": 85.16667
  },
  {
    "name": "Patnagarh, Odisha, India",
    "lat": 20.70833,
    "lng": 83.13263
  },
  {
    "name": "Patrasaer, West Bengal, India",
    "lat": 23.19697,
    "lng": 87.53319
  },
  {
    "name": "Pattan, Jammu and Kashmir, India",
    "lat": 34.16125,
    "lng": 74.55634
  },
  {
    "name": "Pattanamtitta, Kerala, India",
    "lat": 9.28068,
    "lng": 76.86967
  },
  {
    "name": "Patti, Punjab, India",
    "lat": 31.28092,
    "lng": 74.85849
  },
  {
    "name": "Patti, Uttar Pradesh, India",
    "lat": 25.9215,
    "lng": 82.20048
  },
  {
    "name": "Pattukkottai, Tamil Nadu, India",
    "lat": 10.42358,
    "lng": 79.31949
  },
  {
    "name": "Patuli, West Bengal, India",
    "lat": 23.55,
    "lng": 88.25
  },
  {
    "name": "Patur, Maharashtra, India",
    "lat": 20.46093,
    "lng": 76.93725
  },
  {
    "name": "Paturda, Maharashtra, India",
    "lat": 20.95,
    "lng": 76.71666667
  },
  {
    "name": "Paud, Maharashtra, India",
    "lat": 18.52416667,
    "lng": 73.61583333
  },
  {
    "name": "Pauni, Maharashtra, India",
    "lat": 20.78,
    "lng": 79.63
  },
  {
    "name": "Pauri, Uttarakhand, India",
    "lat": 30.15286,
    "lng": 78.7771
  },
  {
    "name": "Pavi Jetpur, Gujarat, India",
    "lat": 22.34472,
    "lng": 73.84093
  },
  {
    "name": "Pavugada, Karnataka, India",
    "lat": 14.09953,
    "lng": 77.28018
  },
  {
    "name": "Pavuluru, Andhra Pradesh, India",
    "lat": 15.85292,
    "lng": 80.16468
  },
  {
    "name": "Pawai, Madhya Pradesh, India",
    "lat": 24.26635,
    "lng": 80.16196
  },
  {
    "name": "Pawayan, Uttar Pradesh, India",
    "lat": 28.06626,
    "lng": 80.10305
  },
  {
    "name": "Pawni, Maharashtra, India",
    "lat": 20.79229,
    "lng": 79.63644
  },
  {
    "name": "Payagpur, Uttar Pradesh, India",
    "lat": 27.4,
    "lng": 81.8
  },
  {
    "name": "Payyanur, Kerala, India",
    "lat": 12.0935,
    "lng": 75.20249
  },
  {
    "name": "Pedana, Andhra Pradesh, India",
    "lat": 16.25582,
    "lng": 81.14378
  },
  {
    "name": "pedda nakkalapalem, Andhra Pradesh, India",
    "lat": 15.8668,
    "lng": 80.16202
  },
  {
    "name": "Peddapalli, Telangana, India",
    "lat": 18.61357,
    "lng": 79.37442
  },
  {
    "name": "Peddapuram, Andhra Pradesh, India",
    "lat": 17.07701,
    "lng": 82.13836
  },
  {
    "name": "Pedgaon, Maharashtra, India",
    "lat": 18.51166667,
    "lng": 74.7075
  },
  {
    "name": "Pehowa, Haryana, India",
    "lat": 29.97897,
    "lng": 76.58249
  },
  {
    "name": "Peint, Maharashtra, India",
    "lat": 20.25844722,
    "lng": 73.50305278
  },
  {
    "name": "Pen, Maharashtra, India",
    "lat": 18.73734,
    "lng": 73.09603
  },
  {
    "name": "Pendra, Chhattisgarh, India",
    "lat": 22.77548,
    "lng": 81.95968
  },
  {
    "name": "Pennadam, Tamil Nadu, India",
    "lat": 11.40389,
    "lng": 79.24156
  },
  {
    "name": "Pennagaram, Tamil Nadu, India",
    "lat": 12.13433,
    "lng": 77.89525
  },
  {
    "name": "Pennathur, Tamil Nadu, India",
    "lat": 12.24681,
    "lng": 79.22592
  },
  {
    "name": "Penugonda, Andhra Pradesh, India",
    "lat": 16.65363,
    "lng": 81.7455
  },
  {
    "name": "Penukonda, Andhra Pradesh, India",
    "lat": 14.08286,
    "lng": 77.59473
  },
  {
    "name": "Peraiyur, Tamil Nadu, India",
    "lat": 9.73579,
    "lng": 77.78955
  },
  {
    "name": "Perambalur, Tamil Nadu, India",
    "lat": 11.272,
    "lng": 78.8738
  },
  {
    "name": "Peranamallur, Tamil Nadu, India",
    "lat": 12.57052,
    "lng": 79.43332
  },
  {
    "name": "Peranampattu, Tamil Nadu, India",
    "lat": 12.9343,
    "lng": 78.7189
  },
  {
    "name": "Peravurani, Tamil Nadu, India",
    "lat": 10.29035,
    "lng": 79.20156
  },
  {
    "name": "Peren, Nagaland, India",
    "lat": 25.51276,
    "lng": 93.73716
  },
  {
    "name": "Perinthalmanna, Kerala, India",
    "lat": 10.97768,
    "lng": 76.228508
  },
  {
    "name": "Periyakulam, Tamil Nadu, India",
    "lat": 10.12268,
    "lng": 77.54372
  },
  {
    "name": "Periyanayakkanpalaiyam, Tamil Nadu, India",
    "lat": 11.15255,
    "lng": 76.95159
  },
  {
    "name": "Periyanegamam, Tamil Nadu, India",
    "lat": 10.74317,
    "lng": 77.10296
  },
  {
    "name": "Periyapatti, Tamil Nadu, India",
    "lat": 10.75812,
    "lng": 77.27087
  },
  {
    "name": "Periyapattinam, Tamil Nadu, India",
    "lat": 9.27263,
    "lng": 78.90232
  },
  {
    "name": "Pernem, Goa, India",
    "lat": 15.723,
    "lng": 73.79511
  },
  {
    "name": "Perumbavoor, Kerala, India",
    "lat": 10.10695,
    "lng": 76.47366
  },
  {
    "name": "Perumpavur, Kerala, India",
    "lat": 10.11544,
    "lng": 76.47611
  },
  {
    "name": "Perundurai, Tamil Nadu, India",
    "lat": 11.27564,
    "lng": 77.58794
  },
  {
    "name": "Perungudi, Tamil Nadu, India",
    "lat": 12.96095,
    "lng": 80.24094
  },
  {
    "name": "Perur, Tamil Nadu, India",
    "lat": 10.97519,
    "lng": 76.91292
  },
  {
    "name": "Perya, Kerala, India",
    "lat": 11.83334,
    "lng": 75.85408
  },
  {
    "name": "Petlad, Gujarat, India",
    "lat": 22.47681,
    "lng": 72.79995
  },
  {
    "name": "Petlawad, Madhya Pradesh, India",
    "lat": 23.01102,
    "lng": 74.79772
  },
  {
    "name": "Phagwara, Punjab, India",
    "lat": 31.22452,
    "lng": 75.77387
  },
  {
    "name": "Phalauda, Uttar Pradesh, India",
    "lat": 29.18824,
    "lng": 77.82996
  },
  {
    "name": "Phalodi, Rajasthan, India",
    "lat": 27.13102,
    "lng": 72.36826
  },
  {
    "name": "Phaltan, Maharashtra, India",
    "lat": 17.99113,
    "lng": 74.43177
  },
  {
    "name": "Phaphamau, Uttar Pradesh, India",
    "lat": 25.53333333,
    "lng": 81.86666667
  },
  {
    "name": "Phaphund, Uttar Pradesh, India",
    "lat": 26.59888,
    "lng": 79.46437
  },
  {
    "name": "Phariha, Uttar Pradesh, India",
    "lat": 27.32166,
    "lng": 78.47267
  },
  {
    "name": "Phek, Nagaland, India",
    "lat": 25.75,
    "lng": 94.5
  },
  {
    "name": "Pheona, Uttar Pradesh, India",
    "lat": 29.08333333,
    "lng": 78.35
  },
  {
    "name": "Pherzawl, Manipur, India",
    "lat": 24.1437,
    "lng": 93.527
  },
  {
    "name": "Phillaur, Punjab, India",
    "lat": 31.01887,
    "lng": 75.79111
  },
  {
    "name": "Phirangipuram, Andhra Pradesh, India",
    "lat": 16.29078,
    "lng": 80.26233
  },
  {
    "name": "Phulambri, Maharashtra, India",
    "lat": 20.1,
    "lng": 75.41666667
  },
  {
    "name": "Phulbani, Odisha, India",
    "lat": 20.48101,
    "lng": 84.23063
  },
  {
    "name": "Phulera, Rajasthan, India",
    "lat": 26.87401,
    "lng": 75.24171
  },
  {
    "name": "Phulpur, Uttar Pradesh, India",
    "lat": 25.54895,
    "lng": 82.0895
  },
  {
    "name": "Pichhaura, Uttar Pradesh, India",
    "lat": 26.33333333,
    "lng": 79.31666667
  },
  {
    "name": "Pihani, Uttar Pradesh, India",
    "lat": 27.61987,
    "lng": 80.20343
  },
  {
    "name": "Pilani, Rajasthan, India",
    "lat": 28.36725,
    "lng": 75.60352
  },
  {
    "name": "Pilibangan, Rajasthan, India",
    "lat": 29.44964,
    "lng": 74.10093
  },
  {
    "name": "Pilibhit, Uttar Pradesh, India",
    "lat": 28.63124,
    "lng": 79.80436
  },
  {
    "name": "Piliv, Maharashtra, India",
    "lat": 17.678842,
    "lng": 74.966412
  },
  {
    "name": "Pilkhua, Uttar Pradesh, India",
    "lat": 28.71271,
    "lng": 77.656
  },
  {
    "name": "Pilkhuwa, Uttar Pradesh, India",
    "lat": 28.71196944,
    "lng": 77.65445556
  },
  {
    "name": "Pimpalgaon Baswant, Maharashtra, India",
    "lat": 20.16666667,
    "lng": 73.98333333
  },
  {
    "name": "Pimpalgaon Raja, Maharashtra, India",
    "lat": 20.71666667,
    "lng": 76.43333333
  },
  {
    "name": "Pimpri-Chinchwad, Maharashtra, India",
    "lat": 18.62777778,
    "lng": 73.81305556
  },
  {
    "name": "Pimpri, Maharashtra, India",
    "lat": 18.62292,
    "lng": 73.80696
  },
  {
    "name": "Pinahat, Uttar Pradesh, India",
    "lat": 26.88487,
    "lng": 78.37647
  },
  {
    "name": "Pindwara, Rajasthan, India",
    "lat": 24.79749,
    "lng": 73.05505
  },
  {
    "name": "Pinjaur, Haryana, India",
    "lat": 30.79873,
    "lng": 76.91822
  },
  {
    "name": "Pipalkoti, Uttarakhand, India",
    "lat": 30.42553,
    "lng": 79.43066
  },
  {
    "name": "Pipar, Rajasthan, India",
    "lat": 26.38441,
    "lng": 73.54394
  },
  {
    "name": "Pipavav, Gujarat, India",
    "lat": 20.96666667,
    "lng": 71.56666667
  },
  {
    "name": "Pipili, Odisha, India",
    "lat": 20.11357,
    "lng": 85.83147
  },
  {
    "name": "Piplod, Gujarat, India",
    "lat": 22.81666667,
    "lng": 73.9
  },
  {
    "name": "Piploda, Madhya Pradesh, India",
    "lat": 23.35,
    "lng": 75.43333
  },
  {
    "name": "Pippara, Andhra Pradesh, India",
    "lat": 16.71667,
    "lng": 81.55
  },
  {
    "name": "Pipraich, Uttar Pradesh, India",
    "lat": 26.82745,
    "lng": 83.52632
  },
  {
    "name": "Pipri, Maharashtra, India",
    "lat": 19.79371,
    "lng": 75.53519
  },
  {
    "name": "Pipri, Uttar Pradesh, India",
    "lat": 24.18,
    "lng": 83
  },
  {
    "name": "Piravam, Kerala, India",
    "lat": 9.86667,
    "lng": 76.5
  },
  {
    "name": "Pirawa, Rajasthan, India",
    "lat": 24.15506,
    "lng": 76.02728
  },
  {
    "name": "Piriyapatna, Karnataka, India",
    "lat": 12.33497,
    "lng": 76.10073
  },
  {
    "name": "Piro, Bihar, India",
    "lat": 25.33218,
    "lng": 84.40454
  },
  {
    "name": "Pitampura, Delhi, India",
    "lat": 28.68964,
    "lng": 77.13126
  },
  {
    "name": "Pithampur, Madhya Pradesh, India",
    "lat": 22.60197,
    "lng": 75.69649
  },
  {
    "name": "Pithapuram, Andhra Pradesh, India",
    "lat": 17.1168,
    "lng": 82.25284
  },
  {
    "name": "Pithora, Chhattisgarh, India",
    "lat": 21.25021,
    "lng": 82.51707
  },
  {
    "name": "Pithoragarh, Uttarakhand, India",
    "lat": 30,
    "lng": 80.25
  },
  {
    "name": "Pokaran, Rajasthan, India",
    "lat": 26.92007,
    "lng": 71.91631
  },
  {
    "name": "Polasara, Odisha, India",
    "lat": 19.69386,
    "lng": 84.81401
  },
  {
    "name": "Polavaram, Andhra Pradesh, India",
    "lat": 17.24754,
    "lng": 81.64372
  },
  {
    "name": "Pollachi, Tamil Nadu, India",
    "lat": 10.65825,
    "lng": 77.0085
  },
  {
    "name": "Polur, Tamil Nadu, India",
    "lat": 12.51217,
    "lng": 79.12405
  },
  {
    "name": "Ponda, Goa, India",
    "lat": 15.40341,
    "lng": 74.01519
  },
  {
    "name": "Ponmana, Kerala, India",
    "lat": 9.00798,
    "lng": 76.52023
  },
  {
    "name": "Ponnamaravati, Tamil Nadu, India",
    "lat": 10.28032,
    "lng": 78.53601
  },
  {
    "name": "Ponnampet, Karnataka, India",
    "lat": 12.14473,
    "lng": 75.94514
  },
  {
    "name": "Ponnani, Kerala, India",
    "lat": 10.76695,
    "lng": 75.92523
  },
  {
    "name": "Ponneri, Tamil Nadu, India",
    "lat": 13.33868,
    "lng": 80.19487
  },
  {
    "name": "Ponnur, Andhra Pradesh, India",
    "lat": 16.07114,
    "lng": 80.54944
  },
  {
    "name": "Ponnuru, Andhra Pradesh, India",
    "lat": 16.06547,
    "lng": 80.55203
  },
  {
    "name": "Poonamalle, Tamil Nadu, India",
    "lat": 13.04888,
    "lng": 80.11488
  },
  {
    "name": "Porbandar, Gujarat, India",
    "lat": 21.64219,
    "lng": 69.60929
  },
  {
    "name": "Porsa, Madhya Pradesh, India",
    "lat": 26.67444,
    "lng": 78.37081
  },
  {
    "name": "Port Blair, Andaman and Nicobar Islands, India",
    "lat": 11.66613,
    "lng": 92.74635
  },
  {
    "name": "Porur, Tamil Nadu, India",
    "lat": 13.03565,
    "lng": 80.15821
  },
  {
    "name": "Powai, Maharashtra, India",
    "lat": 19.1164,
    "lng": 72.90471
  },
  {
    "name": "Prabhadevi, Maharashtra, India",
    "lat": 19.016905,
    "lng": 72.828649
  },
  {
    "name": "Prabhas Patan, Gujarat, India",
    "lat": 20.88808,
    "lng": 70.40129
  },
  {
    "name": "Prakasam, Andhra Pradesh, India",
    "lat": 15.5,
    "lng": 79.5
  },
  {
    "name": "Prakasha, Maharashtra, India",
    "lat": 21.51666667,
    "lng": 74.31666667
  },
  {
    "name": "Prantij, Gujarat, India",
    "lat": 23.43841944,
    "lng": 72.85718056
  },
  {
    "name": "Pratapgarh, Rajasthan, India",
    "lat": 24.03,
    "lng": 74.78
  },
  {
    "name": "Pratapgarh, Uttar Pradesh, India",
    "lat": 25.75,
    "lng": 81.75
  },
  {
    "name": "Prayagraj (Allahabad), Uttar Pradesh, India",
    "lat": 25.42012,
    "lng": 81.88385
  },
  {
    "name": "Proddatur, Andhra Pradesh, India",
    "lat": 14.7502,
    "lng": 78.54813
  },
  {
    "name": "Puducherry, Puducherry, India",
    "lat": 11.93381,
    "lng": 79.82979
  },
  {
    "name": "Pudukkottai, Tamil Nadu, India",
    "lat": 10.35,
    "lng": 78.9
  },
  {
    "name": "Puduppatti, Tamil Nadu, India",
    "lat": 11.15217,
    "lng": 78.21205
  },
  {
    "name": "Pudur, Tamil Nadu, India",
    "lat": 12.99801,
    "lng": 79.14352
  },
  {
    "name": "Puduvayal, Tamil Nadu, India",
    "lat": 13.33015,
    "lng": 80.14577
  },
  {
    "name": "Pujali, West Bengal, India",
    "lat": 22.47,
    "lng": 88.15
  },
  {
    "name": "Pukhrayan, Uttar Pradesh, India",
    "lat": 26.22375,
    "lng": 79.83739
  },
  {
    "name": "Pulgaon, Maharashtra, India",
    "lat": 20.72204,
    "lng": 78.32056
  },
  {
    "name": "Pulivendla, Andhra Pradesh, India",
    "lat": 14.42139,
    "lng": 78.22502
  },
  {
    "name": "Puliyangudi, Tamil Nadu, India",
    "lat": 9.17489,
    "lng": 77.39799
  },
  {
    "name": "Puliyur, Tamil Nadu, India",
    "lat": 10.63375,
    "lng": 78.84139
  },
  {
    "name": "Pullambadi, Tamil Nadu, India",
    "lat": 10.9411,
    "lng": 78.91041
  },
  {
    "name": "Pulwama, Jammu and Kashmir, India",
    "lat": 33.87405,
    "lng": 74.89955
  },
  {
    "name": "Punahana, Haryana, India",
    "lat": 27.86371,
    "lng": 77.20432
  },
  {
    "name": "Punalur, Kerala, India",
    "lat": 9.01956,
    "lng": 76.92261
  },
  {
    "name": "Punasa, Madhya Pradesh, India",
    "lat": 22.23507,
    "lng": 76.39335
  },
  {
    "name": "Punch, Jammu and Kashmir, India",
    "lat": 33.70178,
    "lng": 74.19916
  },
  {
    "name": "Puncha community development block, West Bengal, India",
    "lat": 23.123,
    "lng": 86.653
  },
  {
    "name": "Pundri, Haryana, India",
    "lat": 29.76096,
    "lng": 76.56034
  },
  {
    "name": "Pune Division, Maharashtra, India",
    "lat": 18.74673,
    "lng": 73.75465
  },
  {
    "name": "Pune, Maharashtra, India",
    "lat": 18.51957,
    "lng": 73.85535
  },
  {
    "name": "Punganuru, Andhra Pradesh, India",
    "lat": 13.36672,
    "lng": 78.57186
  },
  {
    "name": "Punjai Puliyampatti, Tamil Nadu, India",
    "lat": 11.35163,
    "lng": 77.16671
  },
  {
    "name": "Puntamba, Maharashtra, India",
    "lat": 19.75,
    "lng": 74.63333333
  },
  {
    "name": "Pupri, Bihar, India",
    "lat": 26.47079,
    "lng": 85.70311
  },
  {
    "name": "Pural, Maharashtra, India",
    "lat": 16.45,
    "lng": 73.36666667
  },
  {
    "name": "Puranpur, Uttar Pradesh, India",
    "lat": 28.51283,
    "lng": 80.14829
  },
  {
    "name": "Purba Champaran, Bihar, India",
    "lat": 26.58333,
    "lng": 84.83333
  },
  {
    "name": "Purba Medinipur, West Bengal, India",
    "lat": 22.0648451,
    "lng": 87.8377586
  },
  {
    "name": "Purba Singhbhum, Jharkhand, India",
    "lat": 22.59238,
    "lng": 86.48341
  },
  {
    "name": "Puri, Odisha, India",
    "lat": 19.9,
    "lng": 85.6
  },
  {
    "name": "Purmafi, Uttar Pradesh, India",
    "lat": 29.55,
    "lng": 77.26666667
  },
  {
    "name": "Purna, Maharashtra, India",
    "lat": 19.1817,
    "lng": 77.02566
  },
  {
    "name": "Purnia, Bihar, India",
    "lat": 25.81614,
    "lng": 87.40708
  },
  {
    "name": "Purulia, West Bengal, India",
    "lat": 23.33333333,
    "lng": 86.36666667
  },
  {
    "name": "Purushottampur, Odisha, India",
    "lat": 19.52024,
    "lng": 84.88514
  },
  {
    "name": "Purwa, Uttar Pradesh, India",
    "lat": 26.45756,
    "lng": 80.77403
  },
  {
    "name": "Pusad, Maharashtra, India",
    "lat": 19.91274,
    "lng": 77.57838
  },
  {
    "name": "Pushkar, Rajasthan, India",
    "lat": 26.49022,
    "lng": 74.55211
  },
  {
    "name": "Puttaparthi, Andhra Pradesh, India",
    "lat": 14.1652,
    "lng": 77.8117
  },
  {
    "name": "Puttur, Andhra Pradesh, India",
    "lat": 13.44189,
    "lng": 79.55314
  },
  {
    "name": "Puttur, Karnataka, India",
    "lat": 12.75975,
    "lng": 75.20169
  },
  {
    "name": "Qadian, Punjab, India",
    "lat": 31.82198,
    "lng": 75.37663
  },
  {
    "name": "Qadirganj, Uttar Pradesh, India",
    "lat": 27.78333333,
    "lng": 79.06666667
  },
  {
    "name": "Qazigund, Jammu and Kashmir, India",
    "lat": 33.63828,
    "lng": 75.14261
  },
  {
    "name": "Quepem, Goa, India",
    "lat": 15.2128,
    "lng": 74.0772
  },
  {
    "name": "Queula, Goa, India",
    "lat": 15.39011,
    "lng": 73.98557
  },
  {
    "name": "Quthbullapur, Telangana, India",
    "lat": 17.50107,
    "lng": 78.45818
  },
  {
    "name": "Rabkavi, Karnataka, India",
    "lat": 16.47567,
    "lng": 75.1106
  },
  {
    "name": "Rabupura, Uttar Pradesh, India",
    "lat": 28.25153,
    "lng": 77.60253
  },
  {
    "name": "Radaur, Haryana, India",
    "lat": 30.02706,
    "lng": 77.15177
  },
  {
    "name": "Radha Kund, Uttar Pradesh, India",
    "lat": 27.52444444,
    "lng": 77.49027778
  },
  {
    "name": "Radhanagari, Maharashtra, India",
    "lat": 16.41388889,
    "lng": 73.99777778
  },
  {
    "name": "Radhanpur, Gujarat, India",
    "lat": 23.83238,
    "lng": 71.6047
  },
  {
    "name": "Raebareli, Uttar Pradesh, India",
    "lat": 26.2309,
    "lng": 81.23315
  },
  {
    "name": "Rafiganj, Bihar, India",
    "lat": 24.81757,
    "lng": 84.63445
  },
  {
    "name": "Raghogarh, Madhya Pradesh, India",
    "lat": 24.44318,
    "lng": 77.19768
  },
  {
    "name": "Raghudebbati, West Bengal, India",
    "lat": 22.53,
    "lng": 88.2
  },
  {
    "name": "Raghunathpur, Bihar, India",
    "lat": 25.64492,
    "lng": 87.91762
  },
  {
    "name": "Raghunathpur, West Bengal, India",
    "lat": 23.55,
    "lng": 86.67
  },
  {
    "name": "Raha, Assam, India",
    "lat": 26.23333,
    "lng": 92.51667
  },
  {
    "name": "Rahata, Maharashtra, India",
    "lat": 19.71666667,
    "lng": 74.48333333
  },
  {
    "name": "Rahatgarh, Madhya Pradesh, India",
    "lat": 23.78968,
    "lng": 78.39473
  },
  {
    "name": "Rahimatpur, Maharashtra, India",
    "lat": 17.5921,
    "lng": 74.19966
  },
  {
    "name": "Rahon, Punjab, India",
    "lat": 31.05275,
    "lng": 76.11907
  },
  {
    "name": "Rahuri, Maharashtra, India",
    "lat": 19.39069,
    "lng": 74.64979
  },
  {
    "name": "Raia, Goa, India",
    "lat": 15.30499,
    "lng": 73.97096
  },
  {
    "name": "Raichur, Karnataka, India",
    "lat": 16.16,
    "lng": 76.91
  },
  {
    "name": "Raiganj, West Bengal, India",
    "lat": 25.61666667,
    "lng": 88.11666667
  },
  {
    "name": "Raigarh, Chhattisgarh, India",
    "lat": 22.08582,
    "lng": 83.30603
  },
  {
    "name": "Raigarh, Maharashtra, India",
    "lat": 18.57,
    "lng": 73.13
  },
  {
    "name": "Raikot, Punjab, India",
    "lat": 30.65,
    "lng": 75.6
  },
  {
    "name": "Raipur, Chhattisgarh, India",
    "lat": 21.25621,
    "lng": 81.69022
  },
  {
    "name": "Raipur, Rajasthan, India",
    "lat": 26.04259,
    "lng": 74.02373
  },
  {
    "name": "Raipur, Uttarakhand, India",
    "lat": 30.31097,
    "lng": 78.08979
  },
  {
    "name": "Raireshwar, Maharashtra, India",
    "lat": 18.05,
    "lng": 73.73333333
  },
  {
    "name": "Raisen, Madhya Pradesh, India",
    "lat": 23.25,
    "lng": 78.08333
  },
  {
    "name": "Raisinghnagar, Rajasthan, India",
    "lat": 29.53583,
    "lng": 73.44917
  },
  {
    "name": "Raiwala Bara, Uttarakhand, India",
    "lat": 30.01864,
    "lng": 78.2293
  },
  {
    "name": "Raj Nandgaon, Chhattisgarh, India",
    "lat": 21.16667,
    "lng": 81
  },
  {
    "name": "Rajahmundry, Andhra Pradesh, India",
    "lat": 17.00517,
    "lng": 81.77784
  },
  {
    "name": "Rajakhera, Rajasthan, India",
    "lat": 26.89802,
    "lng": 78.171
  },
  {
    "name": "Rajaldesar, Rajasthan, India",
    "lat": 28.02849,
    "lng": 74.47442
  },
  {
    "name": "Rajanna Sircilla, Telangana, India",
    "lat": 18.38629,
    "lng": 78.8156
  },
  {
    "name": "Rajaori, Jammu and Kashmir, India",
    "lat": 33.37526,
    "lng": 74.3092
  },
  {
    "name": "Rajapalaiyam, Tamil Nadu, India",
    "lat": 9.45296,
    "lng": 77.55335
  },
  {
    "name": "Rajapur, Maharashtra, India",
    "lat": 16.65679,
    "lng": 73.51701
  },
  {
    "name": "Rajapur, Uttar Pradesh, India",
    "lat": 25.38725,
    "lng": 81.15125
  },
  {
    "name": "Rajasansi, Punjab, India",
    "lat": 31.72021,
    "lng": 74.8008
  },
  {
    "name": "Rajauri, Jammu and Kashmir, India",
    "lat": 33.25,
    "lng": 74.25
  },
  {
    "name": "Rajgarh, Himachal Pradesh, India",
    "lat": 30.85142,
    "lng": 77.30066
  },
  {
    "name": "Rajgarh, Madhya Pradesh, India",
    "lat": 22.67821,
    "lng": 74.94483
  },
  {
    "name": "Rajgarh, Rajasthan, India",
    "lat": 27.23731,
    "lng": 76.62243
  },
  {
    "name": "Rajgir, Bihar, India",
    "lat": 25.02828,
    "lng": 85.42079
  },
  {
    "name": "Rajgurunagar, Maharashtra, India",
    "lat": 18.86667,
    "lng": 73.9
  },
  {
    "name": "Rajkot, Gujarat, India",
    "lat": 22.33333,
    "lng": 70.83333
  },
  {
    "name": "Rajmahal, West Bengal, India",
    "lat": 25.05,
    "lng": 87.84
  },
  {
    "name": "Rajnagar community development block, West Bengal, India",
    "lat": 23.9472,
    "lng": 87.3625
  },
  {
    "name": "Rajnagar, Madhya Pradesh, India",
    "lat": 24.88929,
    "lng": 79.91178
  },
  {
    "name": "Rajpipla, Gujarat, India",
    "lat": 21.86667,
    "lng": 73.5
  },
  {
    "name": "Rajpur, Madhya Pradesh, India",
    "lat": 22.30393,
    "lng": 74.35568
  },
  {
    "name": "Rajpura, Punjab, India",
    "lat": 30.47856,
    "lng": 76.59284
  },
  {
    "name": "Rajsamand, Rajasthan, India",
    "lat": 25.23822,
    "lng": 73.93503
  },
  {
    "name": "Rajula, Gujarat, India",
    "lat": 21.03854,
    "lng": 71.44345
  },
  {
    "name": "Rajur, Maharashtra, India",
    "lat": 20.11087,
    "lng": 78.89311
  },
  {
    "name": "Rajura, Maharashtra, India",
    "lat": 19.77947,
    "lng": 79.36459
  },
  {
    "name": "Ralegaon, Maharashtra, India",
    "lat": 20.25,
    "lng": 79.81
  },
  {
    "name": "Ram Das, Punjab, India",
    "lat": 31.96739,
    "lng": 74.9087
  },
  {
    "name": "Ramachandrapuram, Andhra Pradesh, India",
    "lat": 16.83636,
    "lng": 82.02871
  },
  {
    "name": "Ramagundam, Telangana, India",
    "lat": 18.755,
    "lng": 79.474
  },
  {
    "name": "Ramamangalam, Kerala, India",
    "lat": 9.93333,
    "lng": 76.5
  },
  {
    "name": "Ramanagara, Karnataka, India",
    "lat": 12.65,
    "lng": 77.35
  },
  {
    "name": "Ramanathapuram, Tamil Nadu, India",
    "lat": 9.37158,
    "lng": 78.83077
  },
  {
    "name": "Ramanayyapeta, Andhra Pradesh, India",
    "lat": 16.94516,
    "lng": 82.2385
  },
  {
    "name": "Ramanuj Ganj, Chhattisgarh, India",
    "lat": 23.80637,
    "lng": 83.69981
  },
  {
    "name": "Ramapuram, Andhra Pradesh, India",
    "lat": 15.28749,
    "lng": 77.86722
  },
  {
    "name": "Ramban, Jammu and Kashmir, India",
    "lat": 33.32301,
    "lng": 75.1861
  },
  {
    "name": "Rambha, Odisha, India",
    "lat": 19.51667,
    "lng": 85.1
  },
  {
    "name": "Ramchandrapur, West Bengal, India",
    "lat": 22.9,
    "lng": 88.48
  },
  {
    "name": "Rameswaram, Tamil Nadu, India",
    "lat": 9.2885,
    "lng": 79.31271
  },
  {
    "name": "Ramewadi, Maharashtra, India",
    "lat": 16.03333333,
    "lng": 74.35
  },
  {
    "name": "Ramganj Mandi, Rajasthan, India",
    "lat": 24.64648,
    "lng": 75.94325
  },
  {
    "name": "Ramgarh, Jammu and Kashmir, India",
    "lat": 33.40379,
    "lng": 74.22388
  },
  {
    "name": "Ramgarh, Jharkhand, India",
    "lat": 23.63073,
    "lng": 85.56057
  },
  {
    "name": "Ramgarh, Rajasthan, India",
    "lat": 27.25097,
    "lng": 75.17893
  },
  {
    "name": "Ramgundam, Telangana, India",
    "lat": 18.80084,
    "lng": 79.45206
  },
  {
    "name": "Ramjibanpur, West Bengal, India",
    "lat": 22.83,
    "lng": 87.62
  },
  {
    "name": "Ramkola, Uttar Pradesh, India",
    "lat": 26.90172,
    "lng": 83.83758
  },
  {
    "name": "Ramnagar, Bihar, India",
    "lat": 27.16371,
    "lng": 84.32342
  },
  {
    "name": "Ramnagar, Jammu and Kashmir, India",
    "lat": 32.80728,
    "lng": 75.31119
  },
  {
    "name": "Ramnagar, Uttar Pradesh, India",
    "lat": 25.26907,
    "lng": 83.02971
  },
  {
    "name": "Ramnagar, Uttarakhand, India",
    "lat": 29.3925,
    "lng": 79.1283
  },
  {
    "name": "Ramnagar, West Bengal, India",
    "lat": 22.77778,
    "lng": 88.24639
  },
  {
    "name": "Rampachodavaram, Andhra Pradesh, India",
    "lat": 17.44088,
    "lng": 81.77558
  },
  {
    "name": "Rampur Hat, West Bengal, India",
    "lat": 24.17737,
    "lng": 87.78275
  },
  {
    "name": "Rampur, Himachal Pradesh, India",
    "lat": 31.44943,
    "lng": 77.63087
  },
  {
    "name": "Rampur, Uttar Pradesh, India",
    "lat": 28.81014,
    "lng": 79.02699
  },
  {
    "name": "Rampura, Madhya Pradesh, India",
    "lat": 24.467,
    "lng": 75.43996
  },
  {
    "name": "Rampura, Punjab, India",
    "lat": 30.256,
    "lng": 75.24116
  },
  {
    "name": "Rampura, Uttar Pradesh, India",
    "lat": 26.34967,
    "lng": 79.18234
  },
  {
    "name": "Ramtek, Maharashtra, India",
    "lat": 21.39562,
    "lng": 79.32725
  },
  {
    "name": "Ranaghat, West Bengal, India",
    "lat": 23.1738124,
    "lng": 88.563677
  },
  {
    "name": "Ranapur, Madhya Pradesh, India",
    "lat": 22.64704,
    "lng": 74.52118
  },
  {
    "name": "Ranavav, Gujarat, India",
    "lat": 21.68734,
    "lng": 69.74485
  },
  {
    "name": "Ranchi, Jharkhand, India",
    "lat": 23.34316,
    "lng": 85.3094
  },
  {
    "name": "Rangapara, Assam, India",
    "lat": 26.83772,
    "lng": 92.66876
  },
  {
    "name": "Rangareddi, Telangana, India",
    "lat": 17.27883,
    "lng": 78.16844
  },
  {
    "name": "Rangia, Assam, India",
    "lat": 26.44931,
    "lng": 91.61356
  },
  {
    "name": "Rangpo, Sikkim, India",
    "lat": 27.17733,
    "lng": 88.53358
  },
  {
    "name": "Rani, Rajasthan, India",
    "lat": 25.35031,
    "lng": 73.30885
  },
  {
    "name": "Rania, Haryana, India",
    "lat": 29.52454,
    "lng": 74.83689
  },
  {
    "name": "Ranibennur, Karnataka, India",
    "lat": 14.62239,
    "lng": 75.62951
  },
  {
    "name": "Raniganj, West Bengal, India",
    "lat": 23.62,
    "lng": 87.13
  },
  {
    "name": "Ranikhet, Uttarakhand, India",
    "lat": 29.64082,
    "lng": 79.43229
  },
  {
    "name": "Ranipet, Tamil Nadu, India",
    "lat": 12.9534749,
    "lng": 79.2815916
  },
  {
    "name": "Ranipur Barsi, Uttar Pradesh, India",
    "lat": 29.9,
    "lng": 77.21666667
  },
  {
    "name": "Ranipur, Uttar Pradesh, India",
    "lat": 25.25034,
    "lng": 79.06204
  },
  {
    "name": "Ranir Bazar, Tripura, India",
    "lat": 23.83463,
    "lng": 91.36614
  },
  {
    "name": "Ranpur, Gujarat, India",
    "lat": 22.3667,
    "lng": 71.75
  },
  {
    "name": "Rapar, Gujarat, India",
    "lat": 23.57267,
    "lng": 70.64718
  },
  {
    "name": "Rasipuram, Tamil Nadu, India",
    "lat": 11.46009,
    "lng": 78.18635
  },
  {
    "name": "Rasra, Uttar Pradesh, India",
    "lat": 25.8576,
    "lng": 83.85487
  },
  {
    "name": "Rasulabad, Uttar Pradesh, India",
    "lat": 26.74491,
    "lng": 80.49012
  },
  {
    "name": "Ratangarh, Madhya Pradesh, India",
    "lat": 24.81667,
    "lng": 75.11667
  },
  {
    "name": "Ratangarh, Rajasthan, India",
    "lat": 28.08137,
    "lng": 74.61854
  },
  {
    "name": "Ratanpur, Chhattisgarh, India",
    "lat": 22.2866,
    "lng": 82.16823
  },
  {
    "name": "Rath, Uttar Pradesh, India",
    "lat": 25.59474,
    "lng": 79.5666
  },
  {
    "name": "Ratia, Haryana, India",
    "lat": 29.69029,
    "lng": 75.57688
  },
  {
    "name": "Ratlam, Madhya Pradesh, India",
    "lat": 23.33033,
    "lng": 75.04032
  },
  {
    "name": "Ratnagiri, Maharashtra, India",
    "lat": 17,
    "lng": 73.5
  },
  {
    "name": "Raurkela, Odisha, India",
    "lat": 22.22496,
    "lng": 84.86414
  },
  {
    "name": "Raver, Maharashtra, India",
    "lat": 21.24757,
    "lng": 76.03509
  },
  {
    "name": "Rawatbhata, Rajasthan, India",
    "lat": 24.92981,
    "lng": 75.59209
  },
  {
    "name": "Rawatsar, Rajasthan, India",
    "lat": 29.26724,
    "lng": 74.40288
  },
  {
    "name": "Raxaul, Bihar, India",
    "lat": 26.97982,
    "lng": 84.85065
  },
  {
    "name": "Ray, Jharkhand, India",
    "lat": 23.6843,
    "lng": 85.05457
  },
  {
    "name": "Raya, Uttar Pradesh, India",
    "lat": 27.55607,
    "lng": 77.78972
  },
  {
    "name": "Rayachoti, Andhra Pradesh, India",
    "lat": 14.05723,
    "lng": 78.75056
  },
  {
    "name": "Rayadrug, Andhra Pradesh, India",
    "lat": 14.69971,
    "lng": 76.85241
  },
  {
    "name": "Rayagada, Odisha, India",
    "lat": 19.4,
    "lng": 83.5
  },
  {
    "name": "Raybag, Karnataka, India",
    "lat": 16.49178,
    "lng": 74.77391
  },
  {
    "name": "Raypur, West Bengal, India",
    "lat": 22.41083,
    "lng": 88.50944
  },
  {
    "name": "Razam, Andhra Pradesh, India",
    "lat": 18.44909,
    "lng": 83.65957
  },
  {
    "name": "Razampeta, Andhra Pradesh, India",
    "lat": 14.19544,
    "lng": 79.15896
  },
  {
    "name": "Razole, Andhra Pradesh, India",
    "lat": 16.47608,
    "lng": 81.83912
  },
  {
    "name": "Reha, Gujarat, India",
    "lat": 23.151725,
    "lng": 69.750086
  },
  {
    "name": "Rehar, Uttar Pradesh, India",
    "lat": 29.36666667,
    "lng": 78.76666667
  },
  {
    "name": "Rehli, Madhya Pradesh, India",
    "lat": 23.63722,
    "lng": 79.06275
  },
  {
    "name": "Rehti, Madhya Pradesh, India",
    "lat": 22.73781,
    "lng": 77.43399
  },
  {
    "name": "Remuna, Odisha, India",
    "lat": 21.52798,
    "lng": 86.87156
  },
  {
    "name": "Renapur, Maharashtra, India",
    "lat": 18.51666667,
    "lng": 76.6
  },
  {
    "name": "Renavi, Maharashtra, India",
    "lat": 17.26972222,
    "lng": 74.61055556
  },
  {
    "name": "Rengali, Odisha, India",
    "lat": 21.64602,
    "lng": 84.05311
  },
  {
    "name": "Renigunta, Andhra Pradesh, India",
    "lat": 13.65143,
    "lng": 79.51256
  },
  {
    "name": "Renukoot, Uttar Pradesh, India",
    "lat": 24.2,
    "lng": 83.03
  },
  {
    "name": "Renukut, Uttar Pradesh, India",
    "lat": 24.21641,
    "lng": 83.0358
  },
  {
    "name": "Reoti, Uttar Pradesh, India",
    "lat": 25.85091,
    "lng": 84.3778
  },
  {
    "name": "Reotipur, Uttar Pradesh, India",
    "lat": 25.55,
    "lng": 83.71666667
  },
  {
    "name": "Repalle, Andhra Pradesh, India",
    "lat": 16.0184,
    "lng": 80.82958
  },
  {
    "name": "Revadanda, Maharashtra, India",
    "lat": 18.55363,
    "lng": 72.92559
  },
  {
    "name": "Revdanda, Maharashtra, India",
    "lat": 18.55,
    "lng": 72.93333333
  },
  {
    "name": "Revelganj, Bihar, India",
    "lat": 25.78976,
    "lng": 84.63596
  },
  {
    "name": "Rewa, Madhya Pradesh, India",
    "lat": 24.53256,
    "lng": 81.29234
  },
  {
    "name": "Rewari, Haryana, India",
    "lat": 28.199,
    "lng": 76.6183
  },
  {
    "name": "Ri-Bhoi, Meghalaya, India",
    "lat": 25.88997,
    "lng": 91.82707
  },
  {
    "name": "Riasi, Jammu and Kashmir, India",
    "lat": 33.08115,
    "lng": 74.83242
  },
  {
    "name": "Richha, Uttar Pradesh, India",
    "lat": 28.69467,
    "lng": 79.52284
  },
  {
    "name": "Ringas, Rajasthan, India",
    "lat": 27.3636,
    "lng": 75.56838
  },
  {
    "name": "Rishikesh, Uttarakhand, India",
    "lat": 30.10778,
    "lng": 78.29255
  },
  {
    "name": "Rishra, West Bengal, India",
    "lat": 22.71,
    "lng": 88.35
  },
  {
    "name": "Risod, Maharashtra, India",
    "lat": 19.97671,
    "lng": 76.78799
  },
  {
    "name": "Riyadh, Saudi Arabia",
    "lat": 24.7136,
    "lng": 46.6753
  },
  {
    "name": "Robertsganj, Uttar Pradesh, India",
    "lat": 24.6886,
    "lng": 83.06784
  },
  {
    "name": "Robertsonpet, Karnataka, India",
    "lat": 12.95629,
    "lng": 78.27539
  },
  {
    "name": "Roha, Gujarat, India",
    "lat": 23.19646,
    "lng": 69.27076
  },
  {
    "name": "Roha, Maharashtra, India",
    "lat": 18.43687,
    "lng": 73.11964
  },
  {
    "name": "Rohini, Delhi, India",
    "lat": 28.74322,
    "lng": 77.06778
  },
  {
    "name": "Rohru, Himachal Pradesh, India",
    "lat": 31.20269,
    "lng": 77.75484
  },
  {
    "name": "Rohtak, Haryana, India",
    "lat": 28.83333,
    "lng": 76.66667
  },
  {
    "name": "Rohtas, Bihar, India",
    "lat": 24.97941,
    "lng": 84.02774
  },
  {
    "name": "Rome, Italy",
    "lat": 41.9028,
    "lng": 12.4964
  },
  {
    "name": "Ron, Karnataka, India",
    "lat": 15.69935,
    "lng": 75.73408
  },
  {
    "name": "Roorkee, Uttarakhand, India",
    "lat": 29.86632,
    "lng": 77.89118
  },
  {
    "name": "Rudarpur, Uttar Pradesh, India",
    "lat": 26.44467,
    "lng": 83.61302
  },
  {
    "name": "Rudauli, Uttar Pradesh, India",
    "lat": 26.75,
    "lng": 81.75
  },
  {
    "name": "Rudraprayag, Uttarakhand, India",
    "lat": 30.60872,
    "lng": 79.06517
  },
  {
    "name": "Rupnagar, Punjab, India",
    "lat": 31.04,
    "lng": 76.52
  },
  {
    "name": "Rura, Uttar Pradesh, India",
    "lat": 26.49001,
    "lng": 79.90108
  },
  {
    "name": "Rusera, Bihar, India",
    "lat": 25.75355,
    "lng": 86.02597
  },
  {
    "name": "Sabalgarh, Madhya Pradesh, India",
    "lat": 26.24918,
    "lng": 77.40786
  },
  {
    "name": "Sabalpur, Uttar Pradesh, India",
    "lat": 27.176049,
    "lng": 79.42012
  },
  {
    "name": "Sabar Kantha, Gujarat, India",
    "lat": 23.62974,
    "lng": 73.00197
  },
  {
    "name": "Sabathu, Himachal Pradesh, India",
    "lat": 30.97494,
    "lng": 76.99137
  },
  {
    "name": "Sabrum, Tripura, India",
    "lat": 23.00153,
    "lng": 91.72427
  },
  {
    "name": "Sachendi, Uttar Pradesh, India",
    "lat": 26.371165,
    "lng": 80.1123
  },
  {
    "name": "Sachin, Gujarat, India",
    "lat": 21.08718,
    "lng": 72.88153
  },
  {
    "name": "Sadabad, Uttar Pradesh, India",
    "lat": 27.43818,
    "lng": 78.03758
  },
  {
    "name": "Sadalgi, Karnataka, India",
    "lat": 16.5587,
    "lng": 74.53211
  },
  {
    "name": "Sadaseopet, Telangana, India",
    "lat": 17.61925,
    "lng": 77.95263
  },
  {
    "name": "Sadat, Uttar Pradesh, India",
    "lat": 25.67117,
    "lng": 83.30269
  },
  {
    "name": "Sadri, Rajasthan, India",
    "lat": 25.18555,
    "lng": 73.45288
  },
  {
    "name": "Safidon, Haryana, India",
    "lat": 29.40596,
    "lng": 76.67042
  },
  {
    "name": "Safipur, Uttar Pradesh, India",
    "lat": 26.73783,
    "lng": 80.3435
  },
  {
    "name": "Sagar, Karnataka, India",
    "lat": 14.16498,
    "lng": 75.02901
  },
  {
    "name": "Sagar, Madhya Pradesh, India",
    "lat": 23.75,
    "lng": 78.75
  },
  {
    "name": "Sagauli, Bihar, India",
    "lat": 26.7639,
    "lng": 84.74341
  },
  {
    "name": "Sahapur, West Bengal, India",
    "lat": 22.52,
    "lng": 88.17
  },
  {
    "name": "Saharanpur, Uttar Pradesh, India",
    "lat": 29.9,
    "lng": 77.68333
  },
  {
    "name": "Saharsa, Bihar, India",
    "lat": 25.87498,
    "lng": 86.59611
  },
  {
    "name": "Sahaspur, Uttar Pradesh, India",
    "lat": 29.12125,
    "lng": 78.62273
  },
  {
    "name": "Sahaswan, Uttar Pradesh, India",
    "lat": 28.07227,
    "lng": 78.75082
  },
  {
    "name": "Sahawar, Uttar Pradesh, India",
    "lat": 27.79603,
    "lng": 78.83373
  },
  {
    "name": "Sahibabad, Uttar Pradesh, India",
    "lat": 28.68333333,
    "lng": 77.4
  },
  {
    "name": "Sahibganj, Jharkhand, India",
    "lat": 24.99354,
    "lng": 87.67333
  },
  {
    "name": "Sahpau, Uttar Pradesh, India",
    "lat": 27.43527778,
    "lng": 78.14138889
  },
  {
    "name": "Saidpur, Uttar Pradesh, India",
    "lat": 25.53749,
    "lng": 83.22378
  },
  {
    "name": "Saiha, Mizoram, India",
    "lat": 22.49183,
    "lng": 92.98143
  },
  {
    "name": "Sailana, Madhya Pradesh, India",
    "lat": 23.46219,
    "lng": 74.92318
  },
  {
    "name": "Sailu, Maharashtra, India",
    "lat": 19.47,
    "lng": 76.47
  },
  {
    "name": "Saint Thomas Mount, Tamil Nadu, India",
    "lat": 13.00334,
    "lng": 80.19614
  },
  {
    "name": "Sainthia, West Bengal, India",
    "lat": 23.95,
    "lng": 87.67
  },
  {
    "name": "Sairang, Mizoram, India",
    "lat": 23.81034,
    "lng": 92.65226
  },
  {
    "name": "Saitlaw, Mizoram, India",
    "lat": 23.97187,
    "lng": 92.57454
  },
  {
    "name": "Sakhanu, Uttar Pradesh, India",
    "lat": 27.95472222,
    "lng": 79.2275
  },
  {
    "name": "Sakit, Uttar Pradesh, India",
    "lat": 27.43463,
    "lng": 78.77903
  },
  {
    "name": "Sakleshpur, Karnataka, India",
    "lat": 12.94119,
    "lng": 75.78467
  },
  {
    "name": "Sakol, Maharashtra, India",
    "lat": 18.2825,
    "lng": 76.88444444
  },
  {
    "name": "Sakoli, Maharashtra, India",
    "lat": 21.08,
    "lng": 79.98
  },
  {
    "name": "Sakri, Maharashtra, India",
    "lat": 20.99027778,
    "lng": 74.31444444
  },
  {
    "name": "Sakti, Chhattisgarh, India",
    "lat": 22.02662,
    "lng": 82.96091
  },
  {
    "name": "Salanpur community development block, West Bengal, India",
    "lat": 23.76702,
    "lng": 86.87492
  },
  {
    "name": "Salaya, Gujarat, India",
    "lat": 22.31038,
    "lng": 69.60376
  },
  {
    "name": "Salem, Tamil Nadu, India",
    "lat": 11.6537012,
    "lng": 77.9982106
  },
  {
    "name": "Salempur, Uttar Pradesh, India",
    "lat": 26.3,
    "lng": 83.91666667
  },
  {
    "name": "Saligao, Goa, India",
    "lat": 15.55359,
    "lng": 73.79036
  },
  {
    "name": "Salon, Uttar Pradesh, India",
    "lat": 26.02857,
    "lng": 81.45403
  },
  {
    "name": "Salumbar, Rajasthan, India",
    "lat": 24.13524,
    "lng": 74.04442
  },
  {
    "name": "Salur, Andhra Pradesh, India",
    "lat": 18.51716,
    "lng": 83.20548
  },
  {
    "name": "Samakhiali, Gujarat, India",
    "lat": 23.3034,
    "lng": 70.50688
  },
  {
    "name": "Samalkha, Haryana, India",
    "lat": 29.23552,
    "lng": 77.01273
  },
  {
    "name": "Samalkot, Andhra Pradesh, India",
    "lat": 17.05675,
    "lng": 82.17639
  },
  {
    "name": "Samastipur, Bihar, India",
    "lat": 25.75,
    "lng": 85.91667
  },
  {
    "name": "Samba, Jammu and Kashmir, India",
    "lat": 32.57523,
    "lng": 75.10929
  },
  {
    "name": "Sambalpur, Odisha, India",
    "lat": 21.4,
    "lng": 83.88333
  },
  {
    "name": "Sambhal, Uttar Pradesh, India",
    "lat": 28.58498,
    "lng": 78.56959
  },
  {
    "name": "Sambhar, Rajasthan, India",
    "lat": 26.90806,
    "lng": 75.19137
  },
  {
    "name": "Samdari, Rajasthan, India",
    "lat": 25.81299,
    "lng": 72.57879
  },
  {
    "name": "Samrala, Punjab, India",
    "lat": 30.83601,
    "lng": 76.19324
  },
  {
    "name": "Samthar, Uttar Pradesh, India",
    "lat": 25.84348,
    "lng": 78.90683
  },
  {
    "name": "Samudrapur, Maharashtra, India",
    "lat": 20.65,
    "lng": 78.96666667
  },
  {
    "name": "San Francisco, CA, USA",
    "lat": 37.7749,
    "lng": -122.4194
  },
  {
    "name": "Sanand, Gujarat, India",
    "lat": 22.99227,
    "lng": 72.38177
  },
  {
    "name": "Sanaur, Punjab, India",
    "lat": 30.30182,
    "lng": 76.45786
  },
  {
    "name": "Sanawad, Madhya Pradesh, India",
    "lat": 22.17391,
    "lng": 76.06993
  },
  {
    "name": "Sanchi, Madhya Pradesh, India",
    "lat": 23.48646,
    "lng": 77.7378
  },
  {
    "name": "Sanchor, Rajasthan, India",
    "lat": 24.75361,
    "lng": 71.7728
  },
  {
    "name": "Sancoale, Goa, India",
    "lat": 15.37794,
    "lng": 73.90352
  },
  {
    "name": "Sandi, Uttar Pradesh, India",
    "lat": 27.28867,
    "lng": 79.9519
  },
  {
    "name": "Sandila, Uttar Pradesh, India",
    "lat": 27.06989,
    "lng": 80.51497
  },
  {
    "name": "Sandur, Karnataka, India",
    "lat": 15.08613,
    "lng": 76.54692
  },
  {
    "name": "Sangameshwar, Maharashtra, India",
    "lat": 17.18694444,
    "lng": 73.55305556
  },
  {
    "name": "Sangamner, Maharashtra, India",
    "lat": 19.56784,
    "lng": 74.21154
  },
  {
    "name": "Sangareddi, Telangana, India",
    "lat": 17.62477,
    "lng": 78.08669
  },
  {
    "name": "Sangaria, Rajasthan, India",
    "lat": 29.79886,
    "lng": 74.46683
  },
  {
    "name": "Sangli, Maharashtra, India",
    "lat": 17.11202,
    "lng": 74.7699
  },
  {
    "name": "Sangod, Rajasthan, India",
    "lat": 24.92707,
    "lng": 76.28649
  },
  {
    "name": "Sangola, Maharashtra, India",
    "lat": 17.43948,
    "lng": 75.19379
  },
  {
    "name": "Sangrampur Maharashtra, Maharashtra, India",
    "lat": 21.03,
    "lng": 76.68
  },
  {
    "name": "Sangrur, Punjab, India",
    "lat": 30.24506,
    "lng": 75.84488
  },
  {
    "name": "Sanguem, Goa, India",
    "lat": 15.22901,
    "lng": 74.15149
  },
  {
    "name": "Sanivarsante, Karnataka, India",
    "lat": 12.72824,
    "lng": 75.88669
  },
  {
    "name": "Sankarpur, West Bengal, India",
    "lat": 22.1680569,
    "lng": 88.3070746
  },
  {
    "name": "Sankeshwar, Karnataka, India",
    "lat": 16.25649,
    "lng": 74.48195
  },
  {
    "name": "Sankheda, Gujarat, India",
    "lat": 22.17021,
    "lng": 73.5782
  },
  {
    "name": "Sankrail, West Bengal, India",
    "lat": 22.57,
    "lng": 88.24
  },
  {
    "name": "Sanquelim, Goa, India",
    "lat": 15.56422,
    "lng": 74.00799
  },
  {
    "name": "Sant Kabir Nagar, Uttar Pradesh, India",
    "lat": 26.79016,
    "lng": 83.03481
  },
  {
    "name": "Sant Ravi Das Nagar, Uttar Pradesh, India",
    "lat": 25.35792,
    "lng": 82.4308
  },
  {
    "name": "Santipur, West Bengal, India",
    "lat": 23.25,
    "lng": 88.43
  },
  {
    "name": "Santokhgarh, Himachal Pradesh, India",
    "lat": 31.35205,
    "lng": 76.31775
  },
  {
    "name": "Santoshpur, West Bengal, India",
    "lat": 22.5,
    "lng": 88.17
  },
  {
    "name": "Santuri community development block, West Bengal, India",
    "lat": 23.5272,
    "lng": 86.85709
  },
  {
    "name": "Sanvordem, Goa, India",
    "lat": 15.26269,
    "lng": 74.11965
  },
  {
    "name": "Sanwer, Madhya Pradesh, India",
    "lat": 22.97415,
    "lng": 75.8271
  },
  {
    "name": "Saoli, Maharashtra, India",
    "lat": 20.08133056,
    "lng": 79.78286111
  },
  {
    "name": "Saoner, Maharashtra, India",
    "lat": 21.3851,
    "lng": 78.92155
  },
  {
    "name": "Sapatgram, Assam, India",
    "lat": 26.33732,
    "lng": 90.1236
  },
  {
    "name": "Sarahan, Himachal Pradesh, India",
    "lat": 31.50988,
    "lng": 77.79395
  },
  {
    "name": "Sarai Akil, Uttar Pradesh, India",
    "lat": 25.3789,
    "lng": 81.51035
  },
  {
    "name": "Sarai Ekdil, Uttar Pradesh, India",
    "lat": 26.74442,
    "lng": 79.09353
  },
  {
    "name": "Sarai Mir, Uttar Pradesh, India",
    "lat": 26.02705,
    "lng": 82.91843
  },
  {
    "name": "Saraikela, Jharkhand, India",
    "lat": 22.69963,
    "lng": 85.93126
  },
  {
    "name": "Saraipali, Chhattisgarh, India",
    "lat": 21.3153,
    "lng": 83.00629
  },
  {
    "name": "Saran, Bihar, India",
    "lat": 25.91667,
    "lng": 84.75
  },
  {
    "name": "Sarangarh, Chhattisgarh, India",
    "lat": 21.58614,
    "lng": 83.0785
  },
  {
    "name": "Sarangkheda, Maharashtra, India",
    "lat": 21.433273,
    "lng": 74.526421
  },
  {
    "name": "Sarangpur, Madhya Pradesh, India",
    "lat": 23.56651,
    "lng": 76.47306
  },
  {
    "name": "Sarauli, Uttar Pradesh, India",
    "lat": 28.49404,
    "lng": 79.09177
  },
  {
    "name": "Sarbhon, Gujarat, India",
    "lat": 21.05,
    "lng": 73.0833
  },
  {
    "name": "Sardarshahr, Rajasthan, India",
    "lat": 28.44062,
    "lng": 74.491
  },
  {
    "name": "Sardhana, Uttar Pradesh, India",
    "lat": 29.14551,
    "lng": 77.61433
  },
  {
    "name": "Sardoi, Gujarat, India",
    "lat": 23.5667,
    "lng": 73.2667
  },
  {
    "name": "Sardulgarh, Punjab, India",
    "lat": 29.69224,
    "lng": 75.23608
  },
  {
    "name": "Sarenga, West Bengal, India",
    "lat": 22.54,
    "lng": 88.21
  },
  {
    "name": "Sargur, Karnataka, India",
    "lat": 11.99971,
    "lng": 76.39611
  },
  {
    "name": "Sarila, Uttar Pradesh, India",
    "lat": 25.77579,
    "lng": 79.67535
  },
  {
    "name": "Sarka Ghat, Himachal Pradesh, India",
    "lat": 31.69887,
    "lng": 76.73529
  },
  {
    "name": "Sarkhej, Gujarat, India",
    "lat": 22.98297,
    "lng": 72.50196
  },
  {
    "name": "Sarubera, Jharkhand, India",
    "lat": 23.81813,
    "lng": 85.99628
  },
  {
    "name": "Sarupathar, Assam, India",
    "lat": 26.206,
    "lng": 96.81
  },
  {
    "name": "Sarurpur, Uttar Pradesh, India",
    "lat": 29.03333333,
    "lng": 77.23333333
  },
  {
    "name": "Sarwar, Rajasthan, India",
    "lat": 26.06272,
    "lng": 75.01104
  },
  {
    "name": "Sasni, Uttar Pradesh, India",
    "lat": 27.70287,
    "lng": 78.08278
  },
  {
    "name": "Saswad, Maharashtra, India",
    "lat": 18.55,
    "lng": 74
  },
  {
    "name": "Satana, Maharashtra, India",
    "lat": 20.59483,
    "lng": 74.20301
  },
  {
    "name": "Satara Division, Maharashtra, India",
    "lat": 17.72601,
    "lng": 74.06433
  },
  {
    "name": "Satara, Maharashtra, India",
    "lat": 17.68589,
    "lng": 73.99333
  },
  {
    "name": "Sathamba, Gujarat, India",
    "lat": 23.169125,
    "lng": 73.32661667
  },
  {
    "name": "Sathankulam, Tamil Nadu, India",
    "lat": 8.44164,
    "lng": 77.91349
  },
  {
    "name": "Sathupalli, Telangana, India",
    "lat": 17.24968,
    "lng": 80.86899
  },
  {
    "name": "Sathyamangalam, Tamil Nadu, India",
    "lat": 11.50526,
    "lng": 77.23826
  },
  {
    "name": "Satna, Madhya Pradesh, India",
    "lat": 24.5,
    "lng": 81
  },
  {
    "name": "Satpati, Maharashtra, India",
    "lat": 19.71666667,
    "lng": 72.7
  },
  {
    "name": "Satrikh, Uttar Pradesh, India",
    "lat": 26.86045,
    "lng": 81.19567
  },
  {
    "name": "Sattenapalle, Andhra Pradesh, India",
    "lat": 16.39381,
    "lng": 80.15221
  },
  {
    "name": "Sattur, Tamil Nadu, India",
    "lat": 9.35592,
    "lng": 77.92457
  },
  {
    "name": "Satwas, Madhya Pradesh, India",
    "lat": 22.53628,
    "lng": 76.68452
  },
  {
    "name": "Saugor, Madhya Pradesh, India",
    "lat": 23.83877,
    "lng": 78.73874
  },
  {
    "name": "Saundatti, Karnataka, India",
    "lat": 15.76615,
    "lng": 75.11778
  },
  {
    "name": "Saurikh, Uttar Pradesh, India",
    "lat": 27.03051,
    "lng": 79.48813
  },
  {
    "name": "Sausar, Madhya Pradesh, India",
    "lat": 21.65576,
    "lng": 78.79669
  },
  {
    "name": "Savantvadi, Maharashtra, India",
    "lat": 15.90413,
    "lng": 73.82191
  },
  {
    "name": "Savanur, Karnataka, India",
    "lat": 14.97335,
    "lng": 75.33724
  },
  {
    "name": "Savarkundla, Gujarat, India",
    "lat": 21.33726,
    "lng": 71.3035
  },
  {
    "name": "Savda, Maharashtra, India",
    "lat": 21.15054,
    "lng": 75.88938
  },
  {
    "name": "Savlaj, Maharashtra, India",
    "lat": 17.1,
    "lng": 74.78
  },
  {
    "name": "Savli, Gujarat, India",
    "lat": 22.56666667,
    "lng": 73.21666667
  },
  {
    "name": "Sawai Madhopur, Rajasthan, India",
    "lat": 26.02301,
    "lng": 76.34408
  },
  {
    "name": "Sawantvadi, Maharashtra, India",
    "lat": 16,
    "lng": 73.75
  },
  {
    "name": "Sayalkudi, Tamil Nadu, India",
    "lat": 9.16925,
    "lng": 78.44702
  },
  {
    "name": "Sayla, Gujarat, India",
    "lat": 22.54925,
    "lng": 71.48324
  },
  {
    "name": "Sector, Uttar Pradesh, India",
    "lat": 28.5708,
    "lng": 77.3261
  },
  {
    "name": "Secunderabad, Telangana, India",
    "lat": 17.50427,
    "lng": 78.54263
  },
  {
    "name": "Sehore, Madhya Pradesh, India",
    "lat": 23.2,
    "lng": 77.08333
  },
  {
    "name": "Selu, Maharashtra, India",
    "lat": 19.45512,
    "lng": 76.44073
  },
  {
    "name": "Senapati, Manipur, India",
    "lat": 25.26705,
    "lng": 94.02237
  },
  {
    "name": "Sendhwa, Madhya Pradesh, India",
    "lat": 21.68562,
    "lng": 75.09622
  },
  {
    "name": "Seohara, Uttar Pradesh, India",
    "lat": 29.20904,
    "lng": 78.58837
  },
  {
    "name": "Seondha, Madhya Pradesh, India",
    "lat": 26.15422,
    "lng": 78.7812
  },
  {
    "name": "Seoni Malwa, Madhya Pradesh, India",
    "lat": 22.45046,
    "lng": 77.4665
  },
  {
    "name": "Seoni, Himachal Pradesh, India",
    "lat": 31.24188,
    "lng": 77.12362
  },
  {
    "name": "Seoni, Madhya Pradesh, India",
    "lat": 22.08503,
    "lng": 79.55037
  },
  {
    "name": "Seorinarayan, Chhattisgarh, India",
    "lat": 21.72055,
    "lng": 82.59344
  },
  {
    "name": "Seoul, South Korea",
    "lat": 37.5665,
    "lng": 126.978
  },
  {
    "name": "Seram, Karnataka, India",
    "lat": 17.17859,
    "lng": 77.28998
  },
  {
    "name": "Serampore, West Bengal, India",
    "lat": 22.75,
    "lng": 88.34
  },
  {
    "name": "Serchhip, Mizoram, India",
    "lat": 23.28172,
    "lng": 92.90039
  },
  {
    "name": "Serilingampalle, Telangana, India",
    "lat": 17.49313,
    "lng": 78.30196
  },
  {
    "name": "Serpur, West Bengal, India",
    "lat": 24.13,
    "lng": 88
  },
  {
    "name": "Serula, Goa, India",
    "lat": 15.54774,
    "lng": 73.84329
  },
  {
    "name": "Sevagram, Maharashtra, India",
    "lat": 20.73499167,
    "lng": 78.66256944
  },
  {
    "name": "Seven Pagodas, Tamil Nadu, India",
    "lat": 12.62091,
    "lng": 80.19331
  },
  {
    "name": "Sewri, Maharashtra, India",
    "lat": 19,
    "lng": 72.86
  },
  {
    "name": "Shadipur Julana, Haryana, India",
    "lat": 29.12368,
    "lng": 76.40516
  },
  {
    "name": "Shahabad, Haryana, India",
    "lat": 30.16776,
    "lng": 76.87046
  },
  {
    "name": "Shahabad, Karnataka, India",
    "lat": 17.1307,
    "lng": 76.94361
  },
  {
    "name": "Shahabad, Uttar Pradesh, India",
    "lat": 27.6431,
    "lng": 79.9402
  },
  {
    "name": "Shahada, Maharashtra, India",
    "lat": 21.54538,
    "lng": 74.47106
  },
  {
    "name": "Shahapur, Maharashtra, India",
    "lat": 19.45231,
    "lng": 73.32572
  },
  {
    "name": "Shahbazpur, Bihar, India",
    "lat": 26.30511,
    "lng": 87.28865
  },
  {
    "name": "Shahdol, Madhya Pradesh, India",
    "lat": 23.5,
    "lng": 81.5
  },
  {
    "name": "Shahganj, Uttar Pradesh, India",
    "lat": 26.04965,
    "lng": 82.68423
  },
  {
    "name": "Shahgarh, Madhya Pradesh, India",
    "lat": 24.31365,
    "lng": 79.11806
  },
  {
    "name": "Shahi, Uttar Pradesh, India",
    "lat": 28.55023,
    "lng": 79.31761
  },
  {
    "name": "Shahid Bhagat Singh Nagar, Punjab, India",
    "lat": 31.13183,
    "lng": 76.13328
  },
  {
    "name": "Shahjahanpur, Uttar Pradesh, India",
    "lat": 28,
    "lng": 79.83333
  },
  {
    "name": "Shahkot, Punjab, India",
    "lat": 31.08173,
    "lng": 75.33708
  },
  {
    "name": "Shahpur, Bihar, India",
    "lat": 25.60293,
    "lng": 84.40412
  },
  {
    "name": "Shahpur, Gujarat, India",
    "lat": 22.15611,
    "lng": 70.77068
  },
  {
    "name": "Shahpur, Karnataka, India",
    "lat": 16.69605,
    "lng": 76.8422
  },
  {
    "name": "Shahpur, Madhya Pradesh, India",
    "lat": 21.23742,
    "lng": 76.22558
  },
  {
    "name": "Shahpur, Uttar Pradesh, India",
    "lat": 29.3501,
    "lng": 77.5516
  },
  {
    "name": "Shahpura, Madhya Pradesh, India",
    "lat": 23.13663,
    "lng": 79.66402
  },
  {
    "name": "Shahpura, Rajasthan, India",
    "lat": 25.62094,
    "lng": 74.92487
  },
  {
    "name": "Shajapur, Madhya Pradesh, India",
    "lat": 23.5,
    "lng": 76.25
  },
  {
    "name": "Sham Churasi, Punjab, India",
    "lat": 31.50028,
    "lng": 75.74917
  },
  {
    "name": "Shamgarh, Madhya Pradesh, India",
    "lat": 24.18817,
    "lng": 75.63903
  },
  {
    "name": "Shamli, Uttar Pradesh, India",
    "lat": 29.4497,
    "lng": 77.30959
  },
  {
    "name": "Shamsabad, Uttar Pradesh, India",
    "lat": 27.01718,
    "lng": 78.12358
  },
  {
    "name": "Shanghai, China",
    "lat": 31.2304,
    "lng": 121.4737
  },
  {
    "name": "Shankargarh, Uttar Pradesh, India",
    "lat": 25.182,
    "lng": 81.61769
  },
  {
    "name": "Sharjah, UAE",
    "lat": 25.3463,
    "lng": 55.4209
  },
  {
    "name": "Shedbal, Maharashtra, India",
    "lat": 16.68916667,
    "lng": 74.75425556
  },
  {
    "name": "Shegaon, Maharashtra, India",
    "lat": 20.7932,
    "lng": 76.69921
  },
  {
    "name": "Sheikhpura, Bihar, India",
    "lat": 25.13073,
    "lng": 85.78176
  },
  {
    "name": "Sheoganj, Rajasthan, India",
    "lat": 25.13915,
    "lng": 73.06784
  },
  {
    "name": "Sheohar, Bihar, India",
    "lat": 26.5,
    "lng": 85.3
  },
  {
    "name": "Sheopur, Madhya Pradesh, India",
    "lat": 25.8,
    "lng": 77
  },
  {
    "name": "Shergarh, Uttar Pradesh, India",
    "lat": 28.65128,
    "lng": 79.36815
  },
  {
    "name": "Sherghati, Bihar, India",
    "lat": 24.5595,
    "lng": 84.79162
  },
  {
    "name": "Sherkot, Uttar Pradesh, India",
    "lat": 29.32704,
    "lng": 78.57429
  },
  {
    "name": "Shertallai, Kerala, India",
    "lat": 9.68581,
    "lng": 76.33996
  },
  {
    "name": "Shevgaon, Maharashtra, India",
    "lat": 19.35,
    "lng": 75.23333333
  },
  {
    "name": "Shibnagar, Uttar Pradesh, India",
    "lat": 28.5,
    "lng": 79.98333333
  },
  {
    "name": "Shiggaon, Karnataka, India",
    "lat": 14.99053,
    "lng": 75.22499
  },
  {
    "name": "Shikarpur (Bulandshahr), Uttar Pradesh, India",
    "lat": 28.28,
    "lng": 78.02
  },
  {
    "name": "Shikarpur, Karnataka, India",
    "lat": 14.2698,
    "lng": 75.35643
  },
  {
    "name": "Shikarpur, Uttar Pradesh, India",
    "lat": 28.28072,
    "lng": 78.01411
  },
  {
    "name": "Shikohabad, Uttar Pradesh, India",
    "lat": 27.108,
    "lng": 78.58661
  },
  {
    "name": "Shikrapur, Maharashtra, India",
    "lat": 18.69361111,
    "lng": 74.13805556
  },
  {
    "name": "Shillong, Meghalaya, India",
    "lat": 25.56892,
    "lng": 91.88313
  },
  {
    "name": "Shimla, Himachal Pradesh, India",
    "lat": 31.16667,
    "lng": 77.58333
  },
  {
    "name": "Shimoga, Karnataka, India",
    "lat": 14.05,
    "lng": 75.16
  },
  {
    "name": "Shiraguppi, Maharashtra, India",
    "lat": 16.61875,
    "lng": 74.70907
  },
  {
    "name": "Shirala, Maharashtra, India",
    "lat": 16.98401111,
    "lng": 74.12415278
  },
  {
    "name": "Shirdi, Maharashtra, India",
    "lat": 19.76616,
    "lng": 74.47738
  },
  {
    "name": "Shirgaon, Maharashtra, India",
    "lat": 19.69589,
    "lng": 72.71527
  },
  {
    "name": "Shirhatti, Karnataka, India",
    "lat": 15.23352,
    "lng": 75.57996
  },
  {
    "name": "Shirol, Maharashtra, India",
    "lat": 16.73333333,
    "lng": 74.6
  },
  {
    "name": "Shirpur, Maharashtra, India",
    "lat": 21.34821,
    "lng": 74.88035
  },
  {
    "name": "Shirud, Maharashtra, India",
    "lat": 20.71666667,
    "lng": 74.9
  },
  {
    "name": "Shirwal, Maharashtra, India",
    "lat": 18.15059,
    "lng": 73.97788
  },
  {
    "name": "Shishgarh, Uttar Pradesh, India",
    "lat": 28.72928,
    "lng": 79.31469
  },
  {
    "name": "Shivaji Nagar, Maharashtra, India",
    "lat": 18.53017,
    "lng": 73.85263
  },
  {
    "name": "Shivpuri, Madhya Pradesh, India",
    "lat": 25.42378,
    "lng": 77.66223
  },
  {
    "name": "Shivrajpur, Gujarat, India",
    "lat": 22.42319,
    "lng": 73.60865
  },
  {
    "name": "Shivrajpur, Uttar Pradesh, India",
    "lat": 26.85722222,
    "lng": 79.115
  },
  {
    "name": "Sholinghur, Tamil Nadu, India",
    "lat": 13.1181,
    "lng": 79.42025
  },
  {
    "name": "Shoranur, Kerala, India",
    "lat": 10.76181,
    "lng": 76.27078
  },
  {
    "name": "Shorapur, Karnataka, India",
    "lat": 16.521,
    "lng": 76.75738
  },
  {
    "name": "Shrawasti, Uttar Pradesh, India",
    "lat": 27.50746,
    "lng": 82.0047
  },
  {
    "name": "Shrigonda, Maharashtra, India",
    "lat": 18.61527,
    "lng": 74.69895
  },
  {
    "name": "Shrirangapattana, Karnataka, India",
    "lat": 12.42264,
    "lng": 76.68439
  },
  {
    "name": "Shujalpur, Madhya Pradesh, India",
    "lat": 23.40673,
    "lng": 76.7098
  },
  {
    "name": "Shupiyan, Jammu and Kashmir, India",
    "lat": 33.73067,
    "lng": 74.81869
  },
  {
    "name": "Shyamnagar West Bengal, West Bengal, India",
    "lat": 22.83,
    "lng": 88.37
  },
  {
    "name": "Sibsagar, Assam, India",
    "lat": 26.98427,
    "lng": 94.63784
  },
  {
    "name": "Siddapur, Karnataka, India",
    "lat": 14.34322,
    "lng": 74.894
  },
  {
    "name": "Siddharthnagar, Uttar Pradesh, India",
    "lat": 27.25797,
    "lng": 83.01465
  },
  {
    "name": "Siddhaur, Uttar Pradesh, India",
    "lat": 26.76944444,
    "lng": 81.41805556
  },
  {
    "name": "Siddhpur, Gujarat, India",
    "lat": 23.9167,
    "lng": 72.3833
  },
  {
    "name": "Siddipet, Telangana, India",
    "lat": 18.10483,
    "lng": 78.84858
  },
  {
    "name": "Sidhauli, Uttar Pradesh, India",
    "lat": 27.28202,
    "lng": 80.8345
  },
  {
    "name": "Sidhi, Madhya Pradesh, India",
    "lat": 24.25,
    "lng": 82
  },
  {
    "name": "Sidhpura, Uttar Pradesh, India",
    "lat": 27.63312,
    "lng": 78.86918
  },
  {
    "name": "Sidlaghatta, Karnataka, India",
    "lat": 13.38896,
    "lng": 77.86444
  },
  {
    "name": "Sihor, Gujarat, India",
    "lat": 21.71134,
    "lng": 71.96179
  },
  {
    "name": "Sihora, Madhya Pradesh, India",
    "lat": 23.4871,
    "lng": 80.10404
  },
  {
    "name": "Sijua, Jharkhand, India",
    "lat": 23.77617,
    "lng": 86.33028
  },
  {
    "name": "Sikandarabad, Uttar Pradesh, India",
    "lat": 28.45226,
    "lng": 77.70004
  },
  {
    "name": "Sikandarpur, Uttar Pradesh, India",
    "lat": 26.04327,
    "lng": 84.05298
  },
  {
    "name": "Sikandra Rao, Uttar Pradesh, India",
    "lat": 27.68859,
    "lng": 78.37985
  },
  {
    "name": "Sikandra, Uttar Pradesh, India",
    "lat": 26.36722,
    "lng": 79.6298
  },
  {
    "name": "Sikandrabad, Uttar Pradesh, India",
    "lat": 28.449525,
    "lng": 77.69415278
  },
  {
    "name": "Sikar, Rajasthan, India",
    "lat": 27.61206,
    "lng": 75.13996
  },
  {
    "name": "Sikka, Gujarat, India",
    "lat": 22.43218,
    "lng": 69.84158
  },
  {
    "name": "Silao, Bihar, India",
    "lat": 25.08358,
    "lng": 85.42804
  },
  {
    "name": "Silapathar, Assam, India",
    "lat": 27.59441,
    "lng": 94.72402
  },
  {
    "name": "Silchar, Assam, India",
    "lat": 24.82733,
    "lng": 92.79787
  },
  {
    "name": "Siliguri, West Bengal, India",
    "lat": 26.71004,
    "lng": 88.42851
  },
  {
    "name": "Sillod, Maharashtra, India",
    "lat": 20.30303,
    "lng": 75.65284
  },
  {
    "name": "Silvassa, Dadra and Nagar Haveli and Daman and Diu, India",
    "lat": 20.27386,
    "lng": 72.99673
  },
  {
    "name": "Simaria, Madhya Pradesh, India",
    "lat": 24.79497,
    "lng": 81.152
  },
  {
    "name": "Simdega, Jharkhand, India",
    "lat": 22.61523,
    "lng": 84.50208
  },
  {
    "name": "Simga, Chhattisgarh, India",
    "lat": 21.6281,
    "lng": 81.70376
  },
  {
    "name": "Sindewahi, Maharashtra, India",
    "lat": 20.28333333,
    "lng": 79.65
  },
  {
    "name": "Sindgi, Karnataka, India",
    "lat": 16.91883,
    "lng": 76.23368
  },
  {
    "name": "Sindhnur, Karnataka, India",
    "lat": 15.76983,
    "lng": 76.75581
  },
  {
    "name": "Sindhudurg, Maharashtra, India",
    "lat": 16.17,
    "lng": 73.7
  },
  {
    "name": "Sindi, Maharashtra, India",
    "lat": 20.80509,
    "lng": 78.88752
  },
  {
    "name": "Sindkheda, Maharashtra, India",
    "lat": 21.26666667,
    "lng": 74.73333333
  },
  {
    "name": "Singanallur, Tamil Nadu, India",
    "lat": 10.99898,
    "lng": 77.03238
  },
  {
    "name": "Singapore",
    "lat": 1.3521,
    "lng": 103.8198
  },
  {
    "name": "Singapperumalkovil, Tamil Nadu, India",
    "lat": 12.75947,
    "lng": 80.0075
  },
  {
    "name": "Singapur, Telangana, India",
    "lat": 17.46982,
    "lng": 78.12574
  },
  {
    "name": "Singarayakonda, Andhra Pradesh, India",
    "lat": 15.23046,
    "lng": 80.02794
  },
  {
    "name": "Singoli, Madhya Pradesh, India",
    "lat": 24.96667,
    "lng": 75.3
  },
  {
    "name": "Singrauli, Madhya Pradesh, India",
    "lat": 24.19973,
    "lng": 82.67535
  },
  {
    "name": "Singtam, Sikkim, India",
    "lat": 27.23467,
    "lng": 88.50168
  },
  {
    "name": "Singur, West Bengal, India",
    "lat": 22.81,
    "lng": 88.23
  },
  {
    "name": "Sini, Jharkhand, India",
    "lat": 22.79325,
    "lng": 85.94543
  },
  {
    "name": "Sinnar, Maharashtra, India",
    "lat": 19.84505,
    "lng": 73.99866
  },
  {
    "name": "Sinor, Gujarat, India",
    "lat": 21.91117,
    "lng": 73.33974
  },
  {
    "name": "Sion Mumbai, Maharashtra, India",
    "lat": 19.04,
    "lng": 72.86
  },
  {
    "name": "Sira, Karnataka, India",
    "lat": 13.74155,
    "lng": 76.9043
  },
  {
    "name": "Sirathu, Uttar Pradesh, India",
    "lat": 25.64292,
    "lng": 81.31855
  },
  {
    "name": "Sirhind-Fategarh, Punjab, India",
    "lat": 30.64321,
    "lng": 76.38421
  },
  {
    "name": "Sirkazhi, Tamil Nadu, India",
    "lat": 11.23725,
    "lng": 79.73585
  },
  {
    "name": "Sirmaur, Himachal Pradesh, India",
    "lat": 30.75,
    "lng": 77.5
  },
  {
    "name": "Sirmaur, Madhya Pradesh, India",
    "lat": 24.83648,
    "lng": 81.36448
  },
  {
    "name": "Sirohi, Rajasthan, India",
    "lat": 24.83333,
    "lng": 72.75
  },
  {
    "name": "Sironcha, Maharashtra, India",
    "lat": 18.83,
    "lng": 79.96
  },
  {
    "name": "Sironj, Madhya Pradesh, India",
    "lat": 24.10313,
    "lng": 77.69055
  },
  {
    "name": "Sirpur, Telangana, India",
    "lat": 19.47953,
    "lng": 79.57558
  },
  {
    "name": "Sirsa, Haryana, India",
    "lat": 29.53489,
    "lng": 75.02898
  },
  {
    "name": "Sirsa, Uttar Pradesh, India",
    "lat": 25.2634,
    "lng": 82.0919
  },
  {
    "name": "Sirsaganj, Uttar Pradesh, India",
    "lat": 27.05715,
    "lng": 78.68661
  },
  {
    "name": "Sirsi, Karnataka, India",
    "lat": 14.62072,
    "lng": 74.83554
  },
  {
    "name": "Sirsi, Uttar Pradesh, India",
    "lat": 28.63916,
    "lng": 78.64303
  },
  {
    "name": "Sirsilla, Telangana, India",
    "lat": 18.38865,
    "lng": 78.81048
  },
  {
    "name": "Siruguppa, Karnataka, India",
    "lat": 15.63,
    "lng": 76.89217
  },
  {
    "name": "Sirumugai, Tamil Nadu, India",
    "lat": 11.32137,
    "lng": 77.00521
  },
  {
    "name": "Sirur, Maharashtra, India",
    "lat": 18.8276,
    "lng": 74.37475
  },
  {
    "name": "Sisauli, Uttar Pradesh, India",
    "lat": 29.41386,
    "lng": 77.4689
  },
  {
    "name": "Siswa Bazar, Uttar Pradesh, India",
    "lat": 27.14652,
    "lng": 83.75803
  },
  {
    "name": "Sitamarhi, Bihar, India",
    "lat": 26.66667,
    "lng": 85.5
  },
  {
    "name": "Sitamau, Madhya Pradesh, India",
    "lat": 24.01473,
    "lng": 75.35324
  },
  {
    "name": "Sitapur, Uttar Pradesh, India",
    "lat": 27.5,
    "lng": 80.91667
  },
  {
    "name": "Sitarganj, Uttarakhand, India",
    "lat": 28.9293,
    "lng": 79.70436
  },
  {
    "name": "Sivaganga, Tamil Nadu, India",
    "lat": 9.92762,
    "lng": 78.53763
  },
  {
    "name": "Sivagiri, Tamil Nadu, India",
    "lat": 9.34461,
    "lng": 77.42911
  },
  {
    "name": "Sivakasi, Tamil Nadu, India",
    "lat": 9.44999,
    "lng": 77.79797
  },
  {
    "name": "Sivala East Godavari, Maharashtra, India",
    "lat": 16.75722222,
    "lng": 82.08861111
  },
  {
    "name": "Siwan, Bihar, India",
    "lat": 26.22096,
    "lng": 84.35609
  },
  {
    "name": "Siwana, Rajasthan, India",
    "lat": 25.65154,
    "lng": 72.42243
  },
  {
    "name": "Soalkuchi, Assam, India",
    "lat": 26.16806,
    "lng": 91.57111
  },
  {
    "name": "Sodpur, West Bengal, India",
    "lat": 22.70416667,
    "lng": 88.39166667
  },
  {
    "name": "Sohagi, Madhya Pradesh, India",
    "lat": 24.98181,
    "lng": 81.69558
  },
  {
    "name": "Sohagpur, Madhya Pradesh, India",
    "lat": 22.70055,
    "lng": 78.19522
  },
  {
    "name": "Sohna, Haryana, India",
    "lat": 28.24737,
    "lng": 77.06544
  },
  {
    "name": "Sojat, Rajasthan, India",
    "lat": 25.92493,
    "lng": 73.66633
  },
  {
    "name": "Sojitra, Gujarat, India",
    "lat": 22.53884,
    "lng": 72.71984
  },
  {
    "name": "Solan, Himachal Pradesh, India",
    "lat": 31.08333,
    "lng": 76.83333
  },
  {
    "name": "Solap, West Bengal, India",
    "lat": 22.12777778,
    "lng": 88.15861111
  },
  {
    "name": "Solapur, Maharashtra, India",
    "lat": 17.75,
    "lng": 75.5
  },
  {
    "name": "Solim, Goa, India",
    "lat": 15.61521,
    "lng": 73.7674
  },
  {
    "name": "Someshwar, Karnataka, India",
    "lat": 13.49112,
    "lng": 75.06646
  },
  {
    "name": "Sompeta, Andhra Pradesh, India",
    "lat": 18.94419,
    "lng": 84.58449
  },
  {
    "name": "Somvarpet, Karnataka, India",
    "lat": 12.59698,
    "lng": 75.84957
  },
  {
    "name": "Sonada, West Bengal, India",
    "lat": 27,
    "lng": 88.14
  },
  {
    "name": "Sonala, Maharashtra, India",
    "lat": 21.11666667,
    "lng": 76.73333333
  },
  {
    "name": "Sonamukhi, West Bengal, India",
    "lat": 23.3,
    "lng": 87.42
  },
  {
    "name": "Sonamura, Tripura, India",
    "lat": 23.47547,
    "lng": 91.2659
  },
  {
    "name": "Sonari, Assam, India",
    "lat": 27.02462,
    "lng": 95.01629
  },
  {
    "name": "Sonarpur community development block, West Bengal, India",
    "lat": 22.44259,
    "lng": 88.43044
  },
  {
    "name": "Sonbhadra, Uttar Pradesh, India",
    "lat": 24.40212,
    "lng": 83.05352
  },
  {
    "name": "Sonegaon, Maharashtra, India",
    "lat": 20.62915,
    "lng": 78.69207
  },
  {
    "name": "Sonepur, Odisha, India",
    "lat": 20.83333,
    "lng": 83.91667
  },
  {
    "name": "Songadh, Gujarat, India",
    "lat": 21.16966,
    "lng": 73.56357
  },
  {
    "name": "Songir, Maharashtra, India",
    "lat": 21.08333333,
    "lng": 74.78333333
  },
  {
    "name": "Sonipat, Haryana, India",
    "lat": 29,
    "lng": 76.91667
  },
  {
    "name": "Sonitpur, Assam, India",
    "lat": 26.76748,
    "lng": 92.96425
  },
  {
    "name": "Sonvad, Maharashtra, India",
    "lat": 21.08333333,
    "lng": 75.35
  },
  {
    "name": "Sopur, Jammu and Kashmir, India",
    "lat": 34.28671,
    "lng": 74.47228
  },
  {
    "name": "Sorab, Karnataka, India",
    "lat": 14.38144,
    "lng": 75.09183
  },
  {
    "name": "Sorada, Odisha, India",
    "lat": 19.76082,
    "lng": 84.42997
  },
  {
    "name": "Sorbhog, Assam, India",
    "lat": 26.48612,
    "lng": 90.8859
  },
  {
    "name": "Soro, Odisha, India",
    "lat": 21.27851,
    "lng": 86.68833
  },
  {
    "name": "Soron, Uttar Pradesh, India",
    "lat": 27.89055,
    "lng": 78.74621
  },
  {
    "name": "South 24 Parganas, West Bengal, India",
    "lat": 22.16197,
    "lng": 88.4317
  },
  {
    "name": "South Andaman, Andaman and Nicobar Islands, India",
    "lat": 10.75776,
    "lng": 92.52136
  },
  {
    "name": "South Delhi, Delhi, India",
    "lat": 28.53009,
    "lng": 77.25174
  },
  {
    "name": "South Garo Hills, Meghalaya, India",
    "lat": 25.30162,
    "lng": 90.5853
  },
  {
    "name": "South Goa, Goa, India",
    "lat": 15.20425,
    "lng": 74.16733
  },
  {
    "name": "South Tripura, Tripura, India",
    "lat": 23.1671,
    "lng": 91.60953
  },
  {
    "name": "South West Delhi, Delhi, India",
    "lat": 28.5806,
    "lng": 77.0672
  },
  {
    "name": "South West Garo Hills, Meghalaya, India",
    "lat": 25.47245,
    "lng": 89.93399
  },
  {
    "name": "South West Khasi Hills, Meghalaya, India",
    "lat": 25.32155,
    "lng": 91.29462
  },
  {
    "name": "South, Sikkim, India",
    "lat": 27.33333,
    "lng": 88.41667
  },
  {
    "name": "Soygaon, Maharashtra, India",
    "lat": 20.59606,
    "lng": 75.61765
  },
  {
    "name": "Soyibug, Jammu and Kashmir, India",
    "lat": 34.07677,
    "lng": 74.7057
  },
  {
    "name": "Sravana Belgola, Karnataka, India",
    "lat": 12.85737,
    "lng": 76.48886
  },
  {
    "name": "Sri Dungargarh, Rajasthan, India",
    "lat": 28.09617,
    "lng": 74.00868
  },
  {
    "name": "Sri Madhopur, Rajasthan, India",
    "lat": 27.46599,
    "lng": 75.59736
  },
  {
    "name": "Sri Muktsar Sahib, Punjab, India",
    "lat": 30.47426,
    "lng": 74.5166
  },
  {
    "name": "Srikakulam, Andhra Pradesh, India",
    "lat": 18.2989,
    "lng": 83.89751
  },
  {
    "name": "Srikhanda, West Bengal, India",
    "lat": 23.6,
    "lng": 88.0833
  },
  {
    "name": "Srimushnam, Tamil Nadu, India",
    "lat": 11.40118,
    "lng": 79.40384
  },
  {
    "name": "Srinagar, Jammu and Kashmir, India",
    "lat": 34.08565,
    "lng": 74.80555
  },
  {
    "name": "Srinagar, Uttarakhand, India",
    "lat": 30.22243,
    "lng": 78.78341
  },
  {
    "name": "Sringeri, Karnataka, India",
    "lat": 13.41698,
    "lng": 75.25271
  },
  {
    "name": "Srinivaspur, Karnataka, India",
    "lat": 13.33914,
    "lng": 78.21175
  },
  {
    "name": "Sriperumbudur, Tamil Nadu, India",
    "lat": 12.96763,
    "lng": 79.94197
  },
  {
    "name": "Sriramnagar, Telangana, India",
    "lat": 17.26652,
    "lng": 78.25544
  },
  {
    "name": "Srirampur, West Bengal, India",
    "lat": 23.35,
    "lng": 88.12
  },
  {
    "name": "Srisailain, Andhra Pradesh, India",
    "lat": 16.07217,
    "lng": 78.86816
  },
  {
    "name": "Srivaikuntam, Tamil Nadu, India",
    "lat": 8.62931,
    "lng": 77.91281
  },
  {
    "name": "Srivardhan, Maharashtra, India",
    "lat": 18.04592,
    "lng": 73.01552
  },
  {
    "name": "Srivilliputhur, Tamil Nadu, India",
    "lat": 9.51272,
    "lng": 77.63369
  },
  {
    "name": "Suar, Uttar Pradesh, India",
    "lat": 29.02841,
    "lng": 79.05654
  },
  {
    "name": "Subarnapur, Odisha, India",
    "lat": 20.93154,
    "lng": 83.82486
  },
  {
    "name": "Suchindram, Tamil Nadu, India",
    "lat": 8.15442,
    "lng": 77.46704
  },
  {
    "name": "Sujangarh, Rajasthan, India",
    "lat": 27.7,
    "lng": 74.46667
  },
  {
    "name": "Suket, Rajasthan, India",
    "lat": 24.64609,
    "lng": 76.0417
  },
  {
    "name": "Sultanpur Lodhi, Punjab, India",
    "lat": 31.21468,
    "lng": 75.19602
  },
  {
    "name": "Sultanpur, Madhya Pradesh, India",
    "lat": 23.13812,
    "lng": 77.93404
  },
  {
    "name": "Sultanpur, Uttar Pradesh, India",
    "lat": 26.25,
    "lng": 82
  },
  {
    "name": "Sultanpur, Uttarakhand, India",
    "lat": 29.75534,
    "lng": 78.11034
  },
  {
    "name": "Sulur, Tamil Nadu, India",
    "lat": 11.02427,
    "lng": 77.12565
  },
  {
    "name": "Suluru, Andhra Pradesh, India",
    "lat": 13.7,
    "lng": 80.01667
  },
  {
    "name": "Sulya, Karnataka, India",
    "lat": 12.561,
    "lng": 75.38741
  },
  {
    "name": "Sumbal, Jammu and Kashmir, India",
    "lat": 34.23072,
    "lng": 74.6472
  },
  {
    "name": "Sunam, Punjab, India",
    "lat": 30.12883,
    "lng": 75.79943
  },
  {
    "name": "Sundargarh, Odisha, India",
    "lat": 22.25,
    "lng": 84.5
  },
  {
    "name": "Sundarnagar, Himachal Pradesh, India",
    "lat": 31.53523,
    "lng": 76.905
  },
  {
    "name": "Sunel, Rajasthan, India",
    "lat": 24.37065,
    "lng": 75.95708
  },
  {
    "name": "Suntikoppa, Karnataka, India",
    "lat": 12.45594,
    "lng": 75.8297
  },
  {
    "name": "Supaul, Bihar, India",
    "lat": 26.25,
    "lng": 86.8
  },
  {
    "name": "Supedi, Gujarat, India",
    "lat": 21.762,
    "lng": 70.378
  },
  {
    "name": "Surajgarh, Rajasthan, India",
    "lat": 28.31005,
    "lng": 75.73271
  },
  {
    "name": "Surandai, Tamil Nadu, India",
    "lat": 8.97574,
    "lng": 77.41923
  },
  {
    "name": "Surat, Gujarat, India",
    "lat": 21.17801,
    "lng": 72.81189
  },
  {
    "name": "Suratgarh, Rajasthan, India",
    "lat": 29.3215,
    "lng": 73.89979
  },
  {
    "name": "Surendranagar, Gujarat, India",
    "lat": 22.72706,
    "lng": 71.64856
  },
  {
    "name": "Surgana, Maharashtra, India",
    "lat": 20.55956,
    "lng": 73.63747
  },
  {
    "name": "Surguja, Chhattisgarh, India",
    "lat": 22.89624,
    "lng": 83.09631
  },
  {
    "name": "Suri, West Bengal, India",
    "lat": 23.91666667,
    "lng": 87.53333333
  },
  {
    "name": "Surianwan, Uttar Pradesh, India",
    "lat": 25.46387,
    "lng": 82.41922
  },
  {
    "name": "Suriapet, Telangana, India",
    "lat": 17.14054,
    "lng": 79.62045
  },
  {
    "name": "Susner, Madhya Pradesh, India",
    "lat": 23.94667,
    "lng": 76.08825
  },
  {
    "name": "Sutrapada, Gujarat, India",
    "lat": 20.8928,
    "lng": 70.465
  },
  {
    "name": "Swamimalai, Tamil Nadu, India",
    "lat": 10.95747,
    "lng": 79.32931
  },
  {
    "name": "Swarupnagar community development block, West Bengal, India",
    "lat": 22.8333,
    "lng": 88.8667
  },
  {
    "name": "Sydney, NSW, Australia",
    "lat": -33.8688,
    "lng": 151.2093
  },
  {
    "name": "Tadepalle, Andhra Pradesh, India",
    "lat": 16.48333,
    "lng": 80.6
  },
  {
    "name": "Tadepallegudem, Andhra Pradesh, India",
    "lat": 16.81467,
    "lng": 81.52717
  },
  {
    "name": "Tadpatri, Andhra Pradesh, India",
    "lat": 14.90832,
    "lng": 78.01031
  },
  {
    "name": "Tajpur, Uttar Pradesh, India",
    "lat": 29.16242,
    "lng": 78.48458
  },
  {
    "name": "Takdah, West Bengal, India",
    "lat": 27.0333,
    "lng": 88.3667
  },
  {
    "name": "Takhatgarh, Rajasthan, India",
    "lat": 25.32235,
    "lng": 73.00487
  },
  {
    "name": "Takhatpur, Chhattisgarh, India",
    "lat": 22.12915,
    "lng": 81.86959
  },
  {
    "name": "Taki, West Bengal, India",
    "lat": 22.59,
    "lng": 88.92
  },
  {
    "name": "Taklibhan, Maharashtra, India",
    "lat": 19.6167,
    "lng": 74.8
  },
  {
    "name": "Tal, Madhya Pradesh, India",
    "lat": 23.71979,
    "lng": 75.38514
  },
  {
    "name": "Talaja, Gujarat, India",
    "lat": 21.3527,
    "lng": 72.03524
  },
  {
    "name": "Talbahat, Uttar Pradesh, India",
    "lat": 25.04357,
    "lng": 78.43441
  },
  {
    "name": "Talbid, Maharashtra, India",
    "lat": 17.35,
    "lng": 74.13
  },
  {
    "name": "Talcher, Odisha, India",
    "lat": 20.94927,
    "lng": 85.23354
  },
  {
    "name": "Talegaon Dabhade, Maharashtra, India",
    "lat": 18.73502,
    "lng": 73.67561
  },
  {
    "name": "Talegaon Dhamdhere, Maharashtra, India",
    "lat": 18.6678,
    "lng": 74.1536
  },
  {
    "name": "Taleigao, Goa, India",
    "lat": 15.46915,
    "lng": 73.83285
  },
  {
    "name": "Talen, Madhya Pradesh, India",
    "lat": 23.56949,
    "lng": 76.72821
  },
  {
    "name": "Talgram, Uttar Pradesh, India",
    "lat": 27.04753,
    "lng": 79.64811
  },
  {
    "name": "Talikota, Karnataka, India",
    "lat": 16.47311,
    "lng": 76.31085
  },
  {
    "name": "Taliparamba, Kerala, India",
    "lat": 12.04161,
    "lng": 75.35927
  },
  {
    "name": "Taloda, Maharashtra, India",
    "lat": 21.56128,
    "lng": 74.21238
  },
  {
    "name": "Talode, Maharashtra, India",
    "lat": 21.56074167,
    "lng": 74.83
  },
  {
    "name": "Talwandi Bhai, Punjab, India",
    "lat": 30.85584,
    "lng": 74.92979
  },
  {
    "name": "Talwara, Punjab, India",
    "lat": 31.9376,
    "lng": 75.88657
  },
  {
    "name": "Tambaram, Tamil Nadu, India",
    "lat": 12.9246,
    "lng": 80.12707
  },
  {
    "name": "Tamenglong, Manipur, India",
    "lat": 24.97548,
    "lng": 93.51563
  },
  {
    "name": "Tamluk, West Bengal, India",
    "lat": 22.2896984,
    "lng": 87.9255933
  },
  {
    "name": "Tanakpur, Uttarakhand, India",
    "lat": 29.074,
    "lng": 80.11139
  },
  {
    "name": "Tanda, Uttar Pradesh, India",
    "lat": 28.97621,
    "lng": 78.94187
  },
  {
    "name": "Tandur, Telangana, India",
    "lat": 17.24849,
    "lng": 77.57698
  },
  {
    "name": "Tanjore, Tamil Nadu, India",
    "lat": 10.78523,
    "lng": 79.13909
  },
  {
    "name": "Tankara, Gujarat, India",
    "lat": 22.65622,
    "lng": 70.74945
  },
  {
    "name": "Tanuku, Andhra Pradesh, India",
    "lat": 16.75438,
    "lng": 81.68143
  },
  {
    "name": "Taoru, Haryana, India",
    "lat": 28.21173,
    "lng": 76.94984
  },
  {
    "name": "Tapi, Gujarat, India",
    "lat": 21.12,
    "lng": 73.4
  },
  {
    "name": "Tarabha, Odisha, India",
    "lat": 20.73252,
    "lng": 83.67443
  },
  {
    "name": "Tarakeswar, West Bengal, India",
    "lat": 22.89,
    "lng": 88.02
  },
  {
    "name": "Taramangalam, Tamil Nadu, India",
    "lat": 11.69403,
    "lng": 77.97035
  },
  {
    "name": "Tarana, Madhya Pradesh, India",
    "lat": 23.33383,
    "lng": 76.04253
  },
  {
    "name": "Taranagar, Rajasthan, India",
    "lat": 28.6686,
    "lng": 75.03207
  },
  {
    "name": "Tarapur, Maharashtra, India",
    "lat": 19.86499,
    "lng": 72.68426
  },
  {
    "name": "Tardeo, Maharashtra, India",
    "lat": 18.97,
    "lng": 72.81
  },
  {
    "name": "Tarikere, Karnataka, India",
    "lat": 13.70954,
    "lng": 75.81382
  },
  {
    "name": "Tarn Taran Sahib, Punjab, India",
    "lat": 31.45191,
    "lng": 74.92777
  },
  {
    "name": "Tasgaon, Maharashtra, India",
    "lat": 17.037,
    "lng": 74.60171
  },
  {
    "name": "Tattayyangarpettai, Tamil Nadu, India",
    "lat": 11.12417,
    "lng": 78.44916
  },
  {
    "name": "Tawang, Arunachal Pradesh, India",
    "lat": 27.57417,
    "lng": 91.92437
  },
  {
    "name": "Teghra, Bihar, India",
    "lat": 25.49043,
    "lng": 85.94001
  },
  {
    "name": "Tehri-Garhwal, Uttarakhand, India",
    "lat": 30.5,
    "lng": 78.66667
  },
  {
    "name": "Tehri, Uttarakhand, India",
    "lat": 30.39086,
    "lng": 78.4803
  },
  {
    "name": "Tekanpur, Madhya Pradesh, India",
    "lat": 25.99401,
    "lng": 78.28322
  },
  {
    "name": "Tekari, Bihar, India",
    "lat": 24.94253,
    "lng": 84.84265
  },
  {
    "name": "Tekkalakote, Karnataka, India",
    "lat": 15.53444,
    "lng": 76.87703
  },
  {
    "name": "Tekkali, Andhra Pradesh, India",
    "lat": 18.6057,
    "lng": 84.23546
  },
  {
    "name": "Telhara, Maharashtra, India",
    "lat": 21.02694,
    "lng": 76.83889
  },
  {
    "name": "Tendukheda, Madhya Pradesh, India",
    "lat": 23.3962,
    "lng": 79.53947
  },
  {
    "name": "Tengnoupal, Manipur, India",
    "lat": 24.3945,
    "lng": 94.1053
  },
  {
    "name": "Teonthar, Madhya Pradesh, India",
    "lat": 24.98207,
    "lng": 81.64194
  },
  {
    "name": "Terdal, Karnataka, India",
    "lat": 16.49379,
    "lng": 75.04667
  },
  {
    "name": "Terha, Uttar Pradesh, India",
    "lat": 25.8333,
    "lng": 80.25
  },
  {
    "name": "Tezpur, Assam, India",
    "lat": 26.63333,
    "lng": 92.8
  },
  {
    "name": "Tezu, Arunachal Pradesh, India",
    "lat": 27.91256,
    "lng": 96.12882
  },
  {
    "name": "Thakurdwara, Uttar Pradesh, India",
    "lat": 29.19203,
    "lng": 78.86145
  },
  {
    "name": "Thakurganj, Bihar, India",
    "lat": 26.42742,
    "lng": 88.13112
  },
  {
    "name": "Thalassery, Kerala, India",
    "lat": 11.74811,
    "lng": 75.4929
  },
  {
    "name": "Thalner, Maharashtra, India",
    "lat": 21.25,
    "lng": 74.9667
  },
  {
    "name": "Than, Gujarat, India",
    "lat": 22.57422,
    "lng": 71.19942
  },
  {
    "name": "Thana Bhawan, Uttar Pradesh, India",
    "lat": 29.58605,
    "lng": 77.41811
  },
  {
    "name": "Thandla, Madhya Pradesh, India",
    "lat": 23.00959,
    "lng": 74.57747
  },
  {
    "name": "Thane, Maharashtra, India",
    "lat": 19.33333,
    "lng": 73.25
  },
  {
    "name": "Thanesar, Haryana, India",
    "lat": 29.97323,
    "lng": 76.83214
  },
  {
    "name": "Thang, Jammu and Kashmir, India",
    "lat": 34.9274,
    "lng": 76.79336
  },
  {
    "name": "Thangadh, Gujarat, India",
    "lat": 22.56666667,
    "lng": 71.18333333
  },
  {
    "name": "Thanjavur, Tamil Nadu, India",
    "lat": 10.64,
    "lng": 79.22
  },
  {
    "name": "Thanna Mandi, Jammu and Kashmir, India",
    "lat": 33.54204,
    "lng": 74.381
  },
  {
    "name": "Thanniyam, Kerala, India",
    "lat": 10.41667,
    "lng": 76.13333
  },
  {
    "name": "Tharad, Gujarat, India",
    "lat": 24.39597,
    "lng": 71.62577
  },
  {
    "name": "Tharangambadi, Tamil Nadu, India",
    "lat": 11.02764,
    "lng": 79.85425
  },
  {
    "name": "Thasra, Gujarat, India",
    "lat": 22.79831,
    "lng": 73.21174
  },
  {
    "name": "The Dangs, Gujarat, India",
    "lat": 20.75,
    "lng": 73.75
  },
  {
    "name": "Theni, Tamil Nadu, India",
    "lat": 9.85,
    "lng": 77.42
  },
  {
    "name": "Thenkasi, Tamil Nadu, India",
    "lat": 8.96003,
    "lng": 77.31525
  },
  {
    "name": "Thenzawl, Mizoram, India",
    "lat": 23.31667,
    "lng": 92.75
  },
  {
    "name": "Theog, Himachal Pradesh, India",
    "lat": 31.12155,
    "lng": 77.35838
  },
  {
    "name": "Thimphu, Bhutan",
    "lat": 27.4728,
    "lng": 89.637
  },
  {
    "name": "Thirukattupalli, Tamil Nadu, India",
    "lat": 10.84431,
    "lng": 78.95647
  },
  {
    "name": "Thiruthani, Tamil Nadu, India",
    "lat": 13.17594,
    "lng": 79.61637
  },
  {
    "name": "Thiruvaiyaru, Tamil Nadu, India",
    "lat": 10.88405,
    "lng": 79.10362
  },
  {
    "name": "Thiruvallur, Tamil Nadu, India",
    "lat": 13.25,
    "lng": 80
  },
  {
    "name": "Thiruvananthapuram, Kerala, India",
    "lat": 8.60399,
    "lng": 76.98574
  },
  {
    "name": "Thiruvarur, Tamil Nadu, India",
    "lat": 10.77269,
    "lng": 79.6368
  },
  {
    "name": "Thiruvidaimaruthur, Tamil Nadu, India",
    "lat": 10.99857,
    "lng": 79.45227
  },
  {
    "name": "Thoothukudi, Tamil Nadu, India",
    "lat": 8.76735,
    "lng": 78.13425
  },
  {
    "name": "Thoubal, Manipur, India",
    "lat": 24.62205,
    "lng": 94.01001
  },
  {
    "name": "Thrissur, Kerala, India",
    "lat": 10.51667,
    "lng": 76.21667
  },
  {
    "name": "Tigri, Uttar Pradesh, India",
    "lat": 28.51083333,
    "lng": 77.23888889
  },
  {
    "name": "Tijara, Rajasthan, India",
    "lat": 27.93411,
    "lng": 76.85541
  },
  {
    "name": "Tikaitnagar, Uttar Pradesh, India",
    "lat": 26.94612,
    "lng": 81.56583
  },
  {
    "name": "Tikamgarh, Madhya Pradesh, India",
    "lat": 24.74327,
    "lng": 78.83061
  },
  {
    "name": "Tikri, Uttar Pradesh, India",
    "lat": 29.2291,
    "lng": 77.35479
  },
  {
    "name": "Tilhar, Uttar Pradesh, India",
    "lat": 27.96282,
    "lng": 79.73827
  },
  {
    "name": "Tilsahri, Uttar Pradesh, India",
    "lat": 26.3333,
    "lng": 80.4167
  },
  {
    "name": "Tindivanam, Tamil Nadu, India",
    "lat": 12.234,
    "lng": 79.65551
  },
  {
    "name": "Tindwari, Uttar Pradesh, India",
    "lat": 25.61739,
    "lng": 80.52718
  },
  {
    "name": "Tinnanur, Tamil Nadu, India",
    "lat": 13.11448,
    "lng": 80.02713
  },
  {
    "name": "Tinsukia, Assam, India",
    "lat": 27.6,
    "lng": 95.6
  },
  {
    "name": "Tiptur, Karnataka, India",
    "lat": 13.2563,
    "lng": 76.47768
  },
  {
    "name": "Tira Sujanpur, Himachal Pradesh, India",
    "lat": 31.83364,
    "lng": 76.50539
  },
  {
    "name": "Tirap, Arunachal Pradesh, India",
    "lat": 27.01917,
    "lng": 95.51788
  },
  {
    "name": "Tirodi, Madhya Pradesh, India",
    "lat": 21.68522,
    "lng": 79.71906
  },
  {
    "name": "Tirthahalli, Karnataka, India",
    "lat": 13.68835,
    "lng": 75.24548
  },
  {
    "name": "Tiruchchendur, Tamil Nadu, India",
    "lat": 8.49725,
    "lng": 78.11906
  },
  {
    "name": "Tiruchengode, Tamil Nadu, India",
    "lat": 11.38016,
    "lng": 77.89444
  },
  {
    "name": "Tiruchirappalli, Tamil Nadu, India",
    "lat": 10.97,
    "lng": 78.65
  },
  {
    "name": "Tirukkoyilur, Tamil Nadu, India",
    "lat": 11.9662,
    "lng": 79.20259
  },
  {
    "name": "Tirumakudal Narsipur, Karnataka, India",
    "lat": 12.21207,
    "lng": 76.9018
  },
  {
    "name": "Tirumala, Andhra Pradesh, India",
    "lat": 13.68333,
    "lng": 79.35
  },
  {
    "name": "Tirumullaivasal, Tamil Nadu, India",
    "lat": 11.23996,
    "lng": 79.83705
  },
  {
    "name": "Tirunelveli Kattabo, Tamil Nadu, India",
    "lat": 8.7927,
    "lng": 77.57409
  },
  {
    "name": "Tirunelveli, Tamil Nadu, India",
    "lat": 8.72742,
    "lng": 77.6838
  },
  {
    "name": "Tirupati, Andhra Pradesh, India",
    "lat": 13.63551,
    "lng": 79.41989
  },
  {
    "name": "Tiruppalaikudi, Tamil Nadu, India",
    "lat": 9.54606,
    "lng": 78.91721
  },
  {
    "name": "Tirupparangunram, Tamil Nadu, India",
    "lat": 9.88151,
    "lng": 78.07306
  },
  {
    "name": "Tiruppur, Tamil Nadu, India",
    "lat": 11.11541,
    "lng": 77.35456
  },
  {
    "name": "Tiruppuvanam, Tamil Nadu, India",
    "lat": 9.82564,
    "lng": 78.25795
  },
  {
    "name": "Tirur, Kerala, India",
    "lat": 10.91368,
    "lng": 75.92118
  },
  {
    "name": "Tiruttangal, Tamil Nadu, India",
    "lat": 9.48333,
    "lng": 77.83333
  },
  {
    "name": "Tiruvalla, Kerala, India",
    "lat": 9.3816,
    "lng": 76.57489
  },
  {
    "name": "Tiruvannamalai, Tamil Nadu, India",
    "lat": 12.51,
    "lng": 79.09
  },
  {
    "name": "Tiruvottiyur, Tamil Nadu, India",
    "lat": 13.15823,
    "lng": 80.30181
  },
  {
    "name": "Tisaiyanvilai, Tamil Nadu, India",
    "lat": 8.33702,
    "lng": 77.86776
  },
  {
    "name": "Titabar, Assam, India",
    "lat": 26.6014,
    "lng": 94.20386
  },
  {
    "name": "Titagarh, West Bengal, India",
    "lat": 22.74,
    "lng": 88.37
  },
  {
    "name": "Titlagarh, Odisha, India",
    "lat": 20.28961,
    "lng": 83.15233
  },
  {
    "name": "Titron, Uttar Pradesh, India",
    "lat": 29.66824,
    "lng": 77.32391
  },
  {
    "name": "Todabhim, Rajasthan, India",
    "lat": 26.91667,
    "lng": 76.81667
  },
  {
    "name": "Todaraisingh, Rajasthan, India",
    "lat": 26.02401,
    "lng": 75.48182
  },
  {
    "name": "Tohana, Haryana, India",
    "lat": 29.71332,
    "lng": 75.90441
  },
  {
    "name": "Tokyo, Japan",
    "lat": 35.6762,
    "lng": 139.6503
  },
  {
    "name": "Tondi, Tamil Nadu, India",
    "lat": 9.74173,
    "lng": 79.01774
  },
  {
    "name": "Tonk, Rajasthan, India",
    "lat": 26.16667,
    "lng": 75.58333
  },
  {
    "name": "Topchanchi, Jharkhand, India",
    "lat": 23.90381,
    "lng": 86.19792
  },
  {
    "name": "Tori Fatehpur, Uttar Pradesh, India",
    "lat": 25.45,
    "lng": 79.1333
  },
  {
    "name": "Toronto, ON, Canada",
    "lat": 43.6532,
    "lng": -79.3832
  },
  {
    "name": "Tosham, Haryana, India",
    "lat": 28.86993,
    "lng": 75.9165
  },
  {
    "name": "Tral, Jammu and Kashmir, India",
    "lat": 33.92708,
    "lng": 75.11585
  },
  {
    "name": "Trimbak, Maharashtra, India",
    "lat": 19.93268,
    "lng": 73.52907
  },
  {
    "name": "Trombay, Maharashtra, India",
    "lat": 19,
    "lng": 72.9
  },
  {
    "name": "Tsrar Sharif, Jammu and Kashmir, India",
    "lat": 33.86319,
    "lng": 74.76524
  },
  {
    "name": "Tuensang District, Nagaland, India",
    "lat": 26.25,
    "lng": 94.75
  },
  {
    "name": "Tuensang, Nagaland, India",
    "lat": 26.26704,
    "lng": 94.82415
  },
  {
    "name": "Tufanganj, West Bengal, India",
    "lat": 26.32,
    "lng": 89.67
  },
  {
    "name": "Tulin, West Bengal, India",
    "lat": 23.37,
    "lng": 85.9
  },
  {
    "name": "Tuljapur, Maharashtra, India",
    "lat": 18.00804,
    "lng": 76.07011
  },
  {
    "name": "Tulsipur, Uttar Pradesh, India",
    "lat": 27.5337,
    "lng": 82.41653
  },
  {
    "name": "Tumakuru, Karnataka, India",
    "lat": 13.5,
    "lng": 77
  },
  {
    "name": "Tumsar, Maharashtra, India",
    "lat": 21.38333,
    "lng": 79.73333
  },
  {
    "name": "Tundla, Uttar Pradesh, India",
    "lat": 27.2146,
    "lng": 78.23683
  },
  {
    "name": "Tuni, Andhra Pradesh, India",
    "lat": 17.35905,
    "lng": 82.54607
  },
  {
    "name": "Tura, Meghalaya, India",
    "lat": 25.51421,
    "lng": 90.20239
  },
  {
    "name": "Turaiyur, Tamil Nadu, India",
    "lat": 11.14968,
    "lng": 78.5987
  },
  {
    "name": "Turuvekere, Karnataka, India",
    "lat": 13.16374,
    "lng": 76.66641
  },
  {
    "name": "Uchalan, West Bengal, India",
    "lat": 23.0333,
    "lng": 87.7833
  },
  {
    "name": "Udaipur, Rajasthan, India",
    "lat": 24.33,
    "lng": 73.77
  },
  {
    "name": "Udaipur, Tripura, India",
    "lat": 23.53333,
    "lng": 91.48333
  },
  {
    "name": "Udaipura, Madhya Pradesh, India",
    "lat": 23.07434,
    "lng": 78.51108
  },
  {
    "name": "Udalguri, Assam, India",
    "lat": 26.75367,
    "lng": 92.10215
  },
  {
    "name": "Udangudi, Tamil Nadu, India",
    "lat": 8.42918,
    "lng": 78.02968
  },
  {
    "name": "Udayagiri, Odisha, India",
    "lat": 20.12416,
    "lng": 84.36869
  },
  {
    "name": "Udgir, Maharashtra, India",
    "lat": 18.39258,
    "lng": 77.11756
  },
  {
    "name": "Udham Singh Nagar, Uttarakhand, India",
    "lat": 29.02746,
    "lng": 79.52347
  },
  {
    "name": "Udhampur, Jammu and Kashmir, India",
    "lat": 33,
    "lng": 75.16667
  },
  {
    "name": "Udpura, Rajasthan, India",
    "lat": 24.73355,
    "lng": 75.97514
  },
  {
    "name": "Udumalaippettai, Tamil Nadu, India",
    "lat": 10.58806,
    "lng": 77.24779
  },
  {
    "name": "Udupi, Karnataka, India",
    "lat": 13.5,
    "lng": 74.87
  },
  {
    "name": "Ugu, Uttar Pradesh, India",
    "lat": 26.79681,
    "lng": 80.32093
  },
  {
    "name": "Ujhani, Uttar Pradesh, India",
    "lat": 28.00311,
    "lng": 79.00821
  },
  {
    "name": "Ujjain, Madhya Pradesh, India",
    "lat": 23.41667,
    "lng": 75.5
  },
  {
    "name": "Ukhrul, Manipur, India",
    "lat": 25.04828,
    "lng": 94.35883
  },
  {
    "name": "Uklana, Haryana, India",
    "lat": 29.51124,
    "lng": 75.87823
  },
  {
    "name": "Ukwa, Madhya Pradesh, India",
    "lat": 21.97102,
    "lng": 80.46625
  },
  {
    "name": "Ula, West Bengal, India",
    "lat": 22.7225,
    "lng": 88.55556
  },
  {
    "name": "Ulhasnagar, Maharashtra, India",
    "lat": 19.21667,
    "lng": 73.15
  },
  {
    "name": "Ullal, Karnataka, India",
    "lat": 12.80569,
    "lng": 74.86058
  },
  {
    "name": "Uluberia, West Bengal, India",
    "lat": 22.47,
    "lng": 88.11
  },
  {
    "name": "Umarga, Maharashtra, India",
    "lat": 17.83841,
    "lng": 76.62331
  },
  {
    "name": "Umaria, Madhya Pradesh, India",
    "lat": 23.52473,
    "lng": 80.83716
  },
  {
    "name": "Umarkhed, Maharashtra, India",
    "lat": 19.60144,
    "lng": 77.68878
  },
  {
    "name": "Umarkot, Chhattisgarh, India",
    "lat": 19.66529,
    "lng": 82.20629
  },
  {
    "name": "Umarpada, Gujarat, India",
    "lat": 21.45,
    "lng": 73.5
  },
  {
    "name": "Umrala, Gujarat, India",
    "lat": 21.84353,
    "lng": 71.80305
  },
  {
    "name": "Umred, Maharashtra, India",
    "lat": 20.85396,
    "lng": 79.32466
  },
  {
    "name": "Umreth, Gujarat, India",
    "lat": 22.69881,
    "lng": 73.11561
  },
  {
    "name": "Umri, Madhya Pradesh, India",
    "lat": 26.51056,
    "lng": 78.93667
  },
  {
    "name": "Umri, Uttar Pradesh, India",
    "lat": 26.33333333,
    "lng": 79.25
  },
  {
    "name": "Un, Gujarat, India",
    "lat": 23.88745,
    "lng": 71.76975
  },
  {
    "name": "Un, Uttar Pradesh, India",
    "lat": 29.58479,
    "lng": 77.2554
  },
  {
    "name": "Una, Gujarat, India",
    "lat": 20.82318,
    "lng": 71.03795
  },
  {
    "name": "Una, Himachal Pradesh, India",
    "lat": 31.46493,
    "lng": 76.26914
  },
  {
    "name": "Unakoti, Tripura, India",
    "lat": 24.32781,
    "lng": 92.00377
  },
  {
    "name": "Unhel, Madhya Pradesh, India",
    "lat": 23.33794,
    "lng": 75.55931
  },
  {
    "name": "Uniara, Rajasthan, India",
    "lat": 26.15336,
    "lng": 75.21523
  },
  {
    "name": "Unjha, Gujarat, India",
    "lat": 23.80366,
    "lng": 72.39101
  },
  {
    "name": "Unnao, Uttar Pradesh, India",
    "lat": 26.5,
    "lng": 80.5
  },
  {
    "name": "Upleta, Gujarat, India",
    "lat": 21.74015,
    "lng": 70.28256
  },
  {
    "name": "Uppal Kalan, Telangana, India",
    "lat": 17.40577,
    "lng": 78.55911
  },
  {
    "name": "Upper Siang, Arunachal Pradesh, India",
    "lat": 28.83355,
    "lng": 94.91806
  },
  {
    "name": "Upper Subansiri, Arunachal Pradesh, India",
    "lat": 28.3,
    "lng": 94
  },
  {
    "name": "Uppiliyapuram, Tamil Nadu, India",
    "lat": 11.26356,
    "lng": 78.5139
  },
  {
    "name": "Uran, Maharashtra, India",
    "lat": 18.87813,
    "lng": 72.93924
  },
  {
    "name": "Uravakonda, Andhra Pradesh, India",
    "lat": 14.94348,
    "lng": 77.25494
  },
  {
    "name": "Uri, Jammu and Kashmir, India",
    "lat": 34.08064,
    "lng": 74.05088
  },
  {
    "name": "Uruli Kanchan, Maharashtra, India",
    "lat": 18.48333333,
    "lng": 74.13333333
  },
  {
    "name": "Usawan, Uttar Pradesh, India",
    "lat": 27.81583333,
    "lng": 79.34861111
  },
  {
    "name": "Usehat, Uttar Pradesh, India",
    "lat": 27.79796,
    "lng": 79.23763
  },
  {
    "name": "Usilampatti, Tamil Nadu, India",
    "lat": 9.96936,
    "lng": 77.78621
  },
  {
    "name": "Uska, Uttar Pradesh, India",
    "lat": 27.2,
    "lng": 83.11666667
  },
  {
    "name": "Utran, Gujarat, India",
    "lat": 21.23333,
    "lng": 72.86667
  },
  {
    "name": "Utraula, Uttar Pradesh, India",
    "lat": 27.31933,
    "lng": 82.41872
  },
  {
    "name": "Uttamapalaiyam, Tamil Nadu, India",
    "lat": 9.80701,
    "lng": 77.32718
  },
  {
    "name": "Uttar Bastar Kanker, Chhattisgarh, India",
    "lat": 20.2,
    "lng": 81.1
  },
  {
    "name": "Uttar Dinajpur, West Bengal, India",
    "lat": 25.62,
    "lng": 88.12
  },
  {
    "name": "Uttar Kannada, Karnataka, India",
    "lat": 14.88333,
    "lng": 74.58333
  },
  {
    "name": "Uttarkashi, Uttarakhand, India",
    "lat": 30.72986,
    "lng": 78.44342
  },
  {
    "name": "Uttarpara Kotrung, West Bengal, India",
    "lat": 22.67,
    "lng": 88.35
  },
  {
    "name": "Uttiramerur, Tamil Nadu, India",
    "lat": 12.61433,
    "lng": 79.75748
  },
  {
    "name": "Uttukkuli, Tamil Nadu, India",
    "lat": 11.16892,
    "lng": 77.45431
  },
  {
    "name": "V.S.K.Valasai (Dindigul-Dist.), Tamil Nadu, India",
    "lat": 10.31549,
    "lng": 78.15141
  },
  {
    "name": "Vada, Maharashtra, India",
    "lat": 19.65347,
    "lng": 73.14811
  },
  {
    "name": "Vadakku Valliyur, Tamil Nadu, India",
    "lat": 8.38286,
    "lng": 77.61221
  },
  {
    "name": "Vadakku Viravanallur, Tamil Nadu, India",
    "lat": 8.69786,
    "lng": 77.51916
  },
  {
    "name": "Vadamadurai, Tamil Nadu, India",
    "lat": 10.44081,
    "lng": 78.09784
  },
  {
    "name": "Vadgam, Gujarat, India",
    "lat": 24.08333333,
    "lng": 72.48333333
  },
  {
    "name": "Vadgaon, Maharashtra, India",
    "lat": 18.7486,
    "lng": 73.641
  },
  {
    "name": "Vadigenhalli, Karnataka, India",
    "lat": 13.29724,
    "lng": 77.80184
  },
  {
    "name": "Vadippatti, Tamil Nadu, India",
    "lat": 10.08481,
    "lng": 77.96113
  },
  {
    "name": "vadlamuru, Andhra Pradesh, India",
    "lat": 17.09545,
    "lng": 82.16565
  },
  {
    "name": "Vadlapudi, Andhra Pradesh, India",
    "lat": 14.31119,
    "lng": 79.8043
  },
  {
    "name": "Vadnagar, Gujarat, India",
    "lat": 23.78593,
    "lng": 72.63893
  },
  {
    "name": "Vadner, Maharashtra, India",
    "lat": 20.25,
    "lng": 74.0333
  },
  {
    "name": "Vadodara, Gujarat, India",
    "lat": 22.29941,
    "lng": 73.20812
  },
  {
    "name": "Vagator, Goa, India",
    "lat": 15.59766,
    "lng": 73.74496
  },
  {
    "name": "Vaghodia INA, Gujarat, India",
    "lat": 22.3,
    "lng": 73.3833
  },
  {
    "name": "Vaghodia, Gujarat, India",
    "lat": 22.30505,
    "lng": 73.40016
  },
  {
    "name": "Vaijapur, Maharashtra, India",
    "lat": 19.92672,
    "lng": 74.7275
  },
  {
    "name": "Vaikam, Kerala, India",
    "lat": 9.74858,
    "lng": 76.39637
  },
  {
    "name": "Vairag, Maharashtra, India",
    "lat": 18.05,
    "lng": 75.8
  },
  {
    "name": "Vaishali, Bihar, India",
    "lat": 25.75,
    "lng": 85.41667
  },
  {
    "name": "Valangaiman, Tamil Nadu, India",
    "lat": 10.89012,
    "lng": 79.39322
  },
  {
    "name": "Valavanur, Tamil Nadu, India",
    "lat": 11.92094,
    "lng": 79.58239
  },
  {
    "name": "Vallabh Vidyanagar, Gujarat, India",
    "lat": 22.53333,
    "lng": 72.9
  },
  {
    "name": "Vallabhipur, Gujarat, India",
    "lat": 21.8878,
    "lng": 71.8795
  },
  {
    "name": "Vallam, Tamil Nadu, India",
    "lat": 10.71988,
    "lng": 79.05981
  },
  {
    "name": "Valparai, Tamil Nadu, India",
    "lat": 10.32691,
    "lng": 76.95116
  },
  {
    "name": "Valpoy, Goa, India",
    "lat": 15.53239,
    "lng": 74.13671
  },
  {
    "name": "Valsad, Gujarat, India",
    "lat": 20.5,
    "lng": 73.08333
  },
  {
    "name": "Valsang, Maharashtra, India",
    "lat": 17.6,
    "lng": 76.0833
  },
  {
    "name": "Vanala, Gujarat, India",
    "lat": 22.45,
    "lng": 71.98333333
  },
  {
    "name": "Vancouver, BC, Canada",
    "lat": 49.2827,
    "lng": -123.1207
  },
  {
    "name": "Vandalur, Tamil Nadu, India",
    "lat": 12.8924,
    "lng": 80.08079
  },
  {
    "name": "Vandavasi, Tamil Nadu, India",
    "lat": 12.50429,
    "lng": 79.60556
  },
  {
    "name": "Vangaon, Maharashtra, India",
    "lat": 19.86666667,
    "lng": 72.75
  },
  {
    "name": "Vaniyambadi, Tamil Nadu, India",
    "lat": 12.68162,
    "lng": 78.62014
  },
  {
    "name": "Vansda, Gujarat, India",
    "lat": 20.45,
    "lng": 73.22
  },
  {
    "name": "Vanthli, Gujarat, India",
    "lat": 21.4833,
    "lng": 70.3333
  },
  {
    "name": "Vapi, Gujarat, India",
    "lat": 20.37175,
    "lng": 72.90493
  },
  {
    "name": "Varanasi, Uttar Pradesh, India",
    "lat": 25.31668,
    "lng": 83.01041
  },
  {
    "name": "Varangaon, Maharashtra, India",
    "lat": 21.01767,
    "lng": 75.91042
  },
  {
    "name": "Varca, Goa, India",
    "lat": 15.23237,
    "lng": 73.94311
  },
  {
    "name": "Varkala, Kerala, India",
    "lat": 8.7333,
    "lng": 76.7167
  },
  {
    "name": "Vartej, Gujarat, India",
    "lat": 21.73947,
    "lng": 72.06553
  },
  {
    "name": "Vasa, Gujarat, India",
    "lat": 23.8398349,
    "lng": 71.9301999
  },
  {
    "name": "Vasavad, Gujarat, India",
    "lat": 21.82657,
    "lng": 71.02436
  },
  {
    "name": "Vasco da Gama, Goa, India",
    "lat": 15.39585,
    "lng": 73.81568
  },
  {
    "name": "Vashi, Maharashtra, India",
    "lat": 19.08,
    "lng": 73.01
  },
  {
    "name": "Vasind, Maharashtra, India",
    "lat": 19.40844,
    "lng": 73.26285
  },
  {
    "name": "Vaso, Gujarat, India",
    "lat": 22.6609576,
    "lng": 72.7553379
  },
  {
    "name": "Vasudevanallur, Tamil Nadu, India",
    "lat": 9.24171,
    "lng": 77.41177
  },
  {
    "name": "Vatakara, Kerala, India",
    "lat": 11.59776,
    "lng": 75.58142
  },
  {
    "name": "Vataman, Gujarat, India",
    "lat": 22.53,
    "lng": 72.42
  },
  {
    "name": "Vattalkundu, Tamil Nadu, India",
    "lat": 10.16069,
    "lng": 77.75883
  },
  {
    "name": "Vatul, Maharashtra, India",
    "lat": 16.75,
    "lng": 73.6
  },
  {
    "name": "Vayalar, Kerala, India",
    "lat": 9.71158,
    "lng": 76.33888
  },
  {
    "name": "Vedaraniyam, Tamil Nadu, India",
    "lat": 10.37208,
    "lng": 79.85095
  },
  {
    "name": "Vedasandur, Tamil Nadu, India",
    "lat": 10.53102,
    "lng": 77.95019
  },
  {
    "name": "Vejalpur, Gujarat, India",
    "lat": 22.69021,
    "lng": 73.56299
  },
  {
    "name": "Velankanni, Tamil Nadu, India",
    "lat": 10.68333,
    "lng": 79.83333
  },
  {
    "name": "Velas Maharashtra, Maharashtra, India",
    "lat": 17.9585,
    "lng": 73.0498
  },
  {
    "name": "Vellanur, Tamil Nadu, India",
    "lat": 13.15804,
    "lng": 80.10634
  },
  {
    "name": "Vellore, Tamil Nadu, India",
    "lat": 12.86,
    "lng": 79.035
  },
  {
    "name": "Velneshwar, Maharashtra, India",
    "lat": 17.3833,
    "lng": 73.2
  },
  {
    "name": "Velur, Tamil Nadu, India",
    "lat": 11.10825,
    "lng": 78.00113
  },
  {
    "name": "Vemalwada, Telangana, India",
    "lat": 18.46523,
    "lng": 78.86894
  },
  {
    "name": "Vengavasal, Tamil Nadu, India",
    "lat": 12.89911,
    "lng": 80.169
  },
  {
    "name": "Vengurla, Maharashtra, India",
    "lat": 15.86125,
    "lng": 73.63182
  },
  {
    "name": "Venkatagiri, Andhra Pradesh, India",
    "lat": 13.96005,
    "lng": 79.58032
  },
  {
    "name": "Vepagunta, Andhra Pradesh, India",
    "lat": 17.77844,
    "lng": 83.21577
  },
  {
    "name": "Veraval, Gujarat, India",
    "lat": 20.9077,
    "lng": 70.36786
  },
  {
    "name": "Vetapalem, Andhra Pradesh, India",
    "lat": 15.78502,
    "lng": 80.30663
  },
  {
    "name": "Vettaikkaranpudur, Tamil Nadu, India",
    "lat": 10.56207,
    "lng": 76.91305
  },
  {
    "name": "Vettavalam, Tamil Nadu, India",
    "lat": 12.10769,
    "lng": 79.24516
  },
  {
    "name": "Vettur, Kerala, India",
    "lat": 8.71742,
    "lng": 76.72582
  },
  {
    "name": "Vidisha, Madhya Pradesh, India",
    "lat": 23.91667,
    "lng": 78
  },
  {
    "name": "Vijapur, Gujarat, India",
    "lat": 23.5623,
    "lng": 72.74848
  },
  {
    "name": "Vijayapura, Karnataka, India",
    "lat": 16.82442,
    "lng": 75.71537
  },
  {
    "name": "Vijayapuri, Tamil Nadu, India",
    "lat": 11.2453,
    "lng": 77.50066
  },
  {
    "name": "Vijayawada, Andhra Pradesh, India",
    "lat": 16.50745,
    "lng": 80.6466
  },
  {
    "name": "Vijaydurg, Maharashtra, India",
    "lat": 16.5667,
    "lng": 73.3333
  },
  {
    "name": "Vikarabad, Telangana, India",
    "lat": 17.3381,
    "lng": 77.90441
  },
  {
    "name": "Vikasnagar, Uttarakhand, India",
    "lat": 30.46944,
    "lng": 77.77275
  },
  {
    "name": "Vikhroli, Maharashtra, India",
    "lat": 19.11,
    "lng": 72.94
  },
  {
    "name": "Vikravandi, Tamil Nadu, India",
    "lat": 12.0369,
    "lng": 79.54595
  },
  {
    "name": "Vilattikulam, Tamil Nadu, India",
    "lat": 9.13227,
    "lng": 78.16635
  },
  {
    "name": "Vile Parle, Maharashtra, India",
    "lat": 19.0999098,
    "lng": 72.8440038
  },
  {
    "name": "Villupuram, Tamil Nadu, India",
    "lat": 11.99,
    "lng": 79.37
  },
  {
    "name": "Vinchhiya, Gujarat, India",
    "lat": 22.21027,
    "lng": 71.37967
  },
  {
    "name": "Vinchur, Maharashtra, India",
    "lat": 20.11666667,
    "lng": 74.28333333
  },
  {
    "name": "Vindhyachal, Uttar Pradesh, India",
    "lat": 25.1667,
    "lng": 82.5
  },
  {
    "name": "Vinukonda, Andhra Pradesh, India",
    "lat": 16.0531,
    "lng": 79.73964
  },
  {
    "name": "Viraganur, Tamil Nadu, India",
    "lat": 11.47613,
    "lng": 78.73553
  },
  {
    "name": "Viramgam, Gujarat, India",
    "lat": 23.12,
    "lng": 72.03
  },
  {
    "name": "Virar, Maharashtra, India",
    "lat": 19.45591,
    "lng": 72.81136
  },
  {
    "name": "Virarajendrapet, Karnataka, India",
    "lat": 12.19644,
    "lng": 75.80512
  },
  {
    "name": "Virpur, Gujarat, India",
    "lat": 23.1892,
    "lng": 73.47987
  },
  {
    "name": "Virudhunagar, Tamil Nadu, India",
    "lat": 9.45,
    "lng": 77.92
  },
  {
    "name": "Visakhapatnam, Andhra Pradesh, India",
    "lat": 17.68009,
    "lng": 83.20161
  },
  {
    "name": "Visavadar, Gujarat, India",
    "lat": 21.33954,
    "lng": 70.74966
  },
  {
    "name": "Visnagar, Gujarat, India",
    "lat": 23.69855,
    "lng": 72.5521
  },
  {
    "name": "Vita Maharashtra, Maharashtra, India",
    "lat": 17.2711,
    "lng": 74.5378
  },
  {
    "name": "Vite, Maharashtra, India",
    "lat": 17.27343,
    "lng": 74.53792
  },
  {
    "name": "Vizianagaram District, Andhra Pradesh, India",
    "lat": 18.41102,
    "lng": 83.37677
  },
  {
    "name": "Vizianagaram, Andhra Pradesh, India",
    "lat": 18.11692,
    "lng": 83.41148
  },
  {
    "name": "Vriddhachalam, Tamil Nadu, India",
    "lat": 11.5183,
    "lng": 79.32411
  },
  {
    "name": "Vrindavan, Uttar Pradesh, India",
    "lat": 27.58105,
    "lng": 77.69662
  },
  {
    "name": "Vuyyuru, Andhra Pradesh, India",
    "lat": 16.36307,
    "lng": 80.84406
  },
  {
    "name": "Vyara, Gujarat, India",
    "lat": 21.11079,
    "lng": 73.39365
  },
  {
    "name": "Wadala, Maharashtra, India",
    "lat": 19.02163056,
    "lng": 72.86458889
  },
  {
    "name": "Wadgaon, Maharashtra, India",
    "lat": 18.7392,
    "lng": 73.63945
  },
  {
    "name": "Wadhai, Gujarat, India",
    "lat": 20.76666667,
    "lng": 73.48333333
  },
  {
    "name": "Wadhwan, Gujarat, India",
    "lat": 22.7,
    "lng": 71.68333333
  },
  {
    "name": "Wadi, Karnataka, India",
    "lat": 17.05183,
    "lng": 76.99048
  },
  {
    "name": "Wadner, Maharashtra, India",
    "lat": 20.84972222,
    "lng": 76.33333333
  },
  {
    "name": "Wadwani, Maharashtra, India",
    "lat": 18.98333333,
    "lng": 76.05
  },
  {
    "name": "Waghai, Gujarat, India",
    "lat": 20.77048,
    "lng": 73.50074
  },
  {
    "name": "Wagholi, Maharashtra, India",
    "lat": 17.9,
    "lng": 74.083
  },
  {
    "name": "Wai, Maharashtra, India",
    "lat": 17.95276,
    "lng": 73.89058
  },
  {
    "name": "Wakad, Maharashtra, India",
    "lat": 18.5993,
    "lng": 73.7625
  },
  {
    "name": "Walajapet, Tamil Nadu, India",
    "lat": 12.9251,
    "lng": 79.36626
  },
  {
    "name": "Walgaon, Maharashtra, India",
    "lat": 20.9989,
    "lng": 77.7064
  },
  {
    "name": "Walki, Maharashtra, India",
    "lat": 18.95,
    "lng": 74.75
  },
  {
    "name": "Wallajahbad, Tamil Nadu, India",
    "lat": 12.79041,
    "lng": 79.82358
  },
  {
    "name": "Walterganj, Uttar Pradesh, India",
    "lat": 26.8667,
    "lng": 82.7167
  },
  {
    "name": "Wani, Maharashtra, India",
    "lat": 20.05507,
    "lng": 78.95313
  },
  {
    "name": "Wankaner, Gujarat, India",
    "lat": 22.61198,
    "lng": 70.94379
  },
  {
    "name": "Wanparti, Telangana, India",
    "lat": 16.36738,
    "lng": 78.06889
  },
  {
    "name": "Warangal, Telangana, India",
    "lat": 18,
    "lng": 79.83333
  },
  {
    "name": "Waraseoni, Madhya Pradesh, India",
    "lat": 21.76184,
    "lng": 80.04301
  },
  {
    "name": "Wardha, Maharashtra, India",
    "lat": 20.73933,
    "lng": 78.59784
  },
  {
    "name": "Waris Aliganj, Bihar, India",
    "lat": 25.0172,
    "lng": 85.64047
  },
  {
    "name": "Warora, Maharashtra, India",
    "lat": 20.22885,
    "lng": 79.00277
  },
  {
    "name": "Warud, Maharashtra, India",
    "lat": 21.47101,
    "lng": 78.26965
  },
  {
    "name": "Washim, Maharashtra, India",
    "lat": 20.2,
    "lng": 77.2
  },
  {
    "name": "Washington, DC, USA",
    "lat": 38.9072,
    "lng": -77.0369
  },
  {
    "name": "Wayanad, Kerala, India",
    "lat": 11.605,
    "lng": 76.083
  },
  {
    "name": "Wazirganj, Uttar Pradesh, India",
    "lat": 28.21145,
    "lng": 79.05665
  },
  {
    "name": "Wellington, Tamil Nadu, India",
    "lat": 11.36552,
    "lng": 76.78442
  },
  {
    "name": "Wer, Rajasthan, India",
    "lat": 27.0186,
    "lng": 77.17636
  },
  {
    "name": "West Delhi, Delhi, India",
    "lat": 28.65655,
    "lng": 77.10068
  },
  {
    "name": "West Garo Hills, Meghalaya, India",
    "lat": 25.56794,
    "lng": 90.22447
  },
  {
    "name": "West Godavari, Andhra Pradesh, India",
    "lat": 17,
    "lng": 81.16667
  },
  {
    "name": "West Jaintia Hills, Meghalaya, India",
    "lat": 25.5,
    "lng": 92.25
  },
  {
    "name": "West Kameng, Arunachal Pradesh, India",
    "lat": 27.4,
    "lng": 92.35
  },
  {
    "name": "West Khasi Hills, Meghalaya, India",
    "lat": 25.54776,
    "lng": 91.26957
  },
  {
    "name": "West Siang, Arunachal Pradesh, India",
    "lat": 28.4,
    "lng": 94.55
  },
  {
    "name": "West Tripura, Tripura, India",
    "lat": 23.91667,
    "lng": 91.5
  },
  {
    "name": "West, Sikkim, India",
    "lat": 27.33333,
    "lng": 88.25
  },
  {
    "name": "Wokha, Nagaland, India",
    "lat": 26.16667,
    "lng": 94.25
  },
  {
    "name": "Worli, Maharashtra, India",
    "lat": 19,
    "lng": 72.815
  },
  {
    "name": "Yadgir, Karnataka, India",
    "lat": 16.73,
    "lng": 76.94
  },
  {
    "name": "Yamunanagar, Haryana, India",
    "lat": 30.23644,
    "lng": 77.30498
  },
  {
    "name": "Yanam, Andhra Pradesh, India",
    "lat": 16.73308,
    "lng": 82.21364
  },
  {
    "name": "Yanam, Puducherry, India",
    "lat": 16.73463,
    "lng": 82.21773
  },
  {
    "name": "Yanamalakuduru, Andhra Pradesh, India",
    "lat": 16.48531,
    "lng": 80.66746
  },
  {
    "name": "Yarada, Andhra Pradesh, India",
    "lat": 17.65872,
    "lng": 83.27419
  },
  {
    "name": "Yaval, Maharashtra, India",
    "lat": 21.16772,
    "lng": 75.69762
  },
  {
    "name": "Yavatmal, Maharashtra, India",
    "lat": 20.15,
    "lng": 78.35
  },
  {
    "name": "Yelahanka, Karnataka, India",
    "lat": 13.10073,
    "lng": 77.59632
  },
  {
    "name": "Yelandur, Karnataka, India",
    "lat": 12.04629,
    "lng": 77.03034
  },
  {
    "name": "Yelbarga, Karnataka, India",
    "lat": 15.61545,
    "lng": 76.01184
  },
  {
    "name": "Yellandu, Telangana, India",
    "lat": 17.59064,
    "lng": 80.32146
  },
  {
    "name": "Yellapur, Karnataka, India",
    "lat": 14.9637,
    "lng": 74.70929
  },
  {
    "name": "Yeola, Maharashtra, India",
    "lat": 20.0424,
    "lng": 74.48944
  },
  {
    "name": "Yol, Himachal Pradesh, India",
    "lat": 32.16423,
    "lng": 76.19622
  },
  {
    "name": "Yusufpur, Uttar Pradesh, India",
    "lat": 25.6667,
    "lng": 83.4667
  },
  {
    "name": "Zafarabad, Uttar Pradesh, India",
    "lat": 25.69867,
    "lng": 82.73354
  },
  {
    "name": "Zahirabad, Telangana, India",
    "lat": 17.68138,
    "lng": 77.60743
  },
  {
    "name": "Zaidpur, Uttar Pradesh, India",
    "lat": 26.83093,
    "lng": 81.32929
  },
  {
    "name": "Zamania, Uttar Pradesh, India",
    "lat": 25.41961,
    "lng": 83.55786
  },
  {
    "name": "Zira, Punjab, India",
    "lat": 30.96853,
    "lng": 74.99106
  },
  {
    "name": "Ziro, Arunachal Pradesh, India",
    "lat": 27.59497,
    "lng": 93.83854
  },
  {
    "name": "Zunheboto, Nagaland, India",
    "lat": 26,
    "lng": 94.5
  }
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
