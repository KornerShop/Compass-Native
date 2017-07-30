export default {
  language: 'en',
  locationProvided: false,
  mapLoading: true,
  location: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.4,
    longitudeDelta: 0.4,
  },
  snapOffices: [],
  wicOffices: [],
  wicVendors: [],
  foodBanks: [],
  wicEligible: 0,
  orientation: {
    scale: '',
    height: '',
    width: '',
    fontScale: '',
  },
  office: 0,
  zipCode: '',
};

// wicEligible states
// 0: eligibility not determined
// 1: eligible
// 2: not eligible

// office states
// 0: no choice
// 1: SNAP
// 2: WIC
