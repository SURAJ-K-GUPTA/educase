const getPool = require('../db/db');
const {z} = require('zod')

const pool = getPool();


function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}


// add zod schema for addSchool
const addSchoolSchema = z.object({
  name: z.string(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});

exports.addSchool = async (req, res) => {
  try {
    const zodResult = addSchoolSchema.safeParse(req.body);
    if (!zodResult.success) {
      return res.status(400).json({ error: zodResult.error.message });
    }
    const { name, address, latitude, longitude } = zodResult.data;
    
    const [result] = await pool.query(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );
    const id = result.insertId;
    res.status(201).json({ message: 'School added', id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// add zod schema for listSchools
const listSchoolsSchema = z.object({
  // convert lat and lng to number
  lat: z.coerce.number(),
  lng: z.coerce.number(),
});

exports.listSchools = async (req, res) => {
 



  try {
    const zodResult = listSchoolsSchema.safeParse(req.query);
    if (!zodResult.success) {
      return res.status(400).json({ error: zodResult.error.message });
    }
    const { lat, lng } = zodResult.data;
    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);
    if (isNaN(userLat) || isNaN(userLng)) {
      return res.status(400).json({ error: 'Invalid coordinates' });
    }

    const [rows] = await pool.query('SELECT * FROM schools');
    const schools = rows;
    const sorted = schools.map(school => ({
      ...school,
      distance: haversineDistance(userLat, userLng, school.latitude, school.longitude)
    })).sort((a, b) => a.distance - b.distance);

    res.json(sorted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
