import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 125,
  duration: '30s',
};
// const idFirstTenQA = Math.floor(Math.random() * (3518963));
// const idLastTenQA = Math.floor(Math.random() * (3518963 - 3160066) + 316006);
// const idFirstTenA = Math.floor(Math.random() * (6189306));
const idLastTenA = Math.floor(Math.random() * (6879306 - 6189306) + 6189306);

export default function () {
  // http.get(`http://localhost:3000/qa/${idFirstTenA}/answers`);
  http.get(`http://localhost:3000/qa/${idLastTenA}/answers`);
  // http.get(`http://localhost:3000/qa/${idFirstTenQA}`);
  // http.get(`http://localhost:3000/qa/${idLastTenQA}`);
  sleep(0.1);
}

// import { sleep } from 'k6';
// import http from 'k6/http';

// // See https://k6.io/docs/using-k6/options
// export const options = {
//   stages: [
//     { duration: '1m', target: 20 },
//     { duration: '3m', target: 20 },
//     { duration: '1m', target: 0 },
//   ],
//   thresholds: {
//     http_req_failed: ['rate<0.02'], // http errors should be less than 2%
//     http_req_duration: ['p(95)<2000'], // 95% requests should be below 2s
//   },
//   ext: {
//     loadimpact: {
//       distribution: {
//         'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 },
//       },
//     },
//   },
// }

// export default function main() {
//   let response = http.get('https://test-api.k6.io/public/crocodiles/');
//   sleep(1);
// }
