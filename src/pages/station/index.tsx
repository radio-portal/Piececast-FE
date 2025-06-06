import { useNavigate } from 'react-router-dom';

const programList = {
	'coolFM': [
		{
			id: 1,
			name: '이현우의 음악앨범',
			image: 'https://img.kbs.co.kr/kbs/228x228/programres.kbs.co.kr/r2007-0069/2021/11/12/1636692969128_346848.jpg',
		},
		{
			id: 2,
			name: '박명수의 라디오쇼',
			image: 'https://img.kbs.co.kr/kbs/228x228/programres.kbs.co.kr/r2014-0355/2022/12/28/1672190094307_419356.jpg',
		},
		{
			id: 3,
			name: '이은지의 가요광장',
			image: 'https://img.kbs.co.kr/kbs/228x228/programres.kbs.co.kr/r2023-0057/2023/4/14/1681449458091_440353.jpg',
		},
		{
			id: 4,
			name: '김이나의 별이 빛나는 밤에',
			image: 'https://podcastaddict.com/cache/artwork/thumb/396347',
		},
		{
			id: 5,
			name: '오마이걸 효정의 볼륨을 높여요',
			image: 'https://img.kbs.co.kr/kbs/228x228/programres.kbs.co.kr/r2024-0245/2024/11/19/1731998749979_552996.jpg',
		},
		{
			id: 6,
			name: '몬스타엑스 I.M의 키스 더 라디오',
			image: 'https://img.kbs.co.kr/kbs/228x228/programres.kbs.co.kr/r2024-0175/2024/6/26/1719383169055_528358.jpg',
		},
	],
	'classicFM': [
		{
			id: 7,
			name: '국악의 향기',
			image: 'https://img.kbs.co.kr/kbs/228x228/programres.kbs.co.kr/r2014-0095/2024/9/25/1727245655174_543836.jpg',
		},
		{
			id: 8,
			name: '출발 FM과 함께',
			image: 'https://img.kbs.co.kr/kbs/228x228/programres.kbs.co.kr/r2002-0282/2023/12/1/1701414380923_487291.jpg',
		},
		{
			id: 9,
			name: '신윤주의 가정음악',
			image: 'https://img.kbs.co.kr/kbs/228x228/programres.kbs.co.kr/r2024-0017/2024/2/28/1709080833265_505512.jpg',
		},
		
	]
}


const Station = () => {
	const navigate = useNavigate();
	return (
		<div className="w-full h-full mx-auto p-8 bg-backgroundLight">
			<div className="max-w-[1200px] mx-auto">
				<div className="flex items-center mt-[20px] gap-4 mb-8">
					<img 
						src="https://about.kbs.co.kr/kor/resources/images/kbs-intro/kbs/img-ci-type-1.png" 
						alt="KBS" 
						className="h-12"
					/>
					<div>
						<h1 className="text-2xl font-bold">KBS 라디오</h1>
						<p className="text-gray-600">대한민국 대표 공영방송</p>
					</div>
				</div>

				<div className="mb-12">
					<h2 className="text-xl font-bold mb-3 text-gray2">Cool FM</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{programList.coolFM.map(program => (
							<div onClick={() => navigate('/program/')} key={program.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
								<img src={program.image} alt={program.name} className="w-20 h-20 rounded-lg object-cover" />
								<div>
									<h3 className="font-semibold text-lg">{program.name}</h3>
								</div>
							</div>
						))}
					</div>
				</div>

				<div>
					<h2 className="text-xl font-bold mb-3 text-gray2">Classic FM</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{programList.classicFM.map(program => (
							<div onClick={() => navigate('/program/')} key={program.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
								<img src={program.image} alt={program.name} className="w-20 h-20 rounded-lg object-cover" />
								<div>
									<h3 className="font-semibold text-lg">{program.name}</h3>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Station;