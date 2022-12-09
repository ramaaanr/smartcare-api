const getAgeRange = require("../helper/age-range");
const { updateChildDevelopment } = require("../helper/child-handler");
const { getDevelopment, getDevelopmentSurvey, setDevelopment} = require("../helper/development-handler");
const HealthStatus = require("../helper/health-status");

describe('Development Handler Testing', () => {
 it('Get Development Data with 6 month age', async () => {
    const age = 6;
    const ageRange = getAgeRange(age);
    expect(ageRange).toEqual(3);
    const { data } = await getDevelopment({ ageRange: ageRange });
    expect(data.status).toEqual("Bayi umur 6-9 bulan")
 });

 it('Get Development Result', () => {
  const healthStatus = new HealthStatus({age: 6});
  const key = [1,1,1,1];
  const answerMemuaskan = [1, 2, 3, 3];
  const answerMeragukan = [1, 1, 2, 3];
  const answerMenyimpang = [1, 0, 3, 1];
  expect(healthStatus.calculateDevelopment({ answer: answerMemuaskan, key }).result).toEqual('memuaskan');
  expect(healthStatus.calculateDevelopment({ answer: answerMeragukan, key }).result).toEqual('meragukan');
  expect(healthStatus.calculateDevelopment({ answer: answerMenyimpang, key }).result).toEqual('menyimpang');
 });

 it('Get Development Stimulation Status', () => {
  const healthStatus = new HealthStatus({age: 6});
  const key = [1, 2, 5, 2];
  const answer = [1, 2, 2, 0];
  expect(healthStatus.calculateDevelopment({answer, key}).stimulations).toEqual([ 'GERAK_KASAR', 'SOSIALISASI_DAN_KEMANDIRIAN' ]);
 });

 it('Get Development Survey by Age', async () => {
    const age = 6;
    const { data } = await getDevelopmentSurvey({age});
    
    expect(data).toEqual({
      key: [ 1, 2, 5, 2 ],
      BICARA_DAN_BAHASA: [
        'Pada waktu bayi bermain sendiri dan ibu diam-diam datang berdiri di belakangnya, apakah ia menengok ke belakang seperti mendengar kedatangan anda? Suara keras tidak ikut dihitung. Jawab YA hanya jika anda melihat reaksinya terhadap suara yang perlahan atau bisikan'
      ],
      SOSIALISASI_DAN_KEMANDIRIAN: [
        'Apakah bayi dapat makan kue kering sendiri?',
        'Letakkan suatu mainan yang dinginkannya di luar jangkauan bayi, apakah ia mencoba mendapatkannya dengan mengulurkan lengan atau badannya?'
      ],
      GERAK_HALUS: [
        'Apakah pernah melihat bayi memindahkan mainan atau kue kering dari satu tangan ke tangan yang lain? Benda-benda panjang seperti sendok atau kerincingan bertangkai tidak ikut dinilai.',
        'Tarik perhatian bayi dengan memperlihatkan wool merah, kemudian jatuh kan ke lantai. Apakah bayi mencoba mencarinya? Misalnya mencari di bawah meja atau di belakang kursi?'
      ],
      GERAK_KASAR: [
        'Tanpa disangga oleh bantal, kursi atau dinding, dapatkah bayi duduk sendiri selama 60 detik?',
        'Jika anda mengangkat bayi melalui ketiaknya ke posisi berdiri, dapatkah ia menyangga sebagian berat badan dengan kedua kakinya? Jawab YA bila ia mencoba berdiri dan sebagian berat badan tertumpu pada kedua kakinya.',
        'Taruh kismis di atas meja. Dapatkah bayi memungut dengan tangannya benda-benda kecil seperti kismis, kacang-kacangan, potongan biskuit, dengan gerakan miring atau menggerapai',
        'Taruh 2 kubus di atas meja, buat agar bayi dapat memungut masing-masing kubus dengan masing-masing tangan dan memegang satu kubus pada masing-masing tangannya',      
        'Pada posisi bayi telentang, pegang kedua tangannya lalu tarik perlahan-lahan ke posisi duduk. Dapatkah bayi mempertahankan lehernya secara kaku ?'
      ]
    })
 });

 it('Set Development Status by Answer', async () => {
  const {error} = await setDevelopment({
    id: 'tester_dev',
    age: 12,
    answer: [0, 1 , 0, 1]
  })
  expect(error).toEqual(false);
 });
});
