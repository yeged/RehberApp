import Tour from "../models/tours"
import Category from "../models/Category"
import Province from "../models/City"

export const TOURS = [
    new Tour(
        "t1",
        ["p3"],
        ["c2"],
        "u1",
        "https://pbs.twimg.com/profile_images/990954136140120065/meJKt50X_400x400.jpg",
        "https://gezilecekyerler.com/wp-content/uploads/2017/03/Galata-Kulesi.jpg",
        "https://gezilecekyerler.com/wp-content/uploads/2017/03/Galata-Kulesi.jpg",
        "Beşiktaş Dolmabahçe Sarayı ve Yıldız Sarayı Kültür ve Sanat Gezintisi",
        4,
        [
            "English",
            "Turkish",
            "Spanish",
        ],
        "Istanbul",
        "Kültür Gezintisi",
        120,
        "Cut the tomatoes and the onion into small pieces.\nBoil some water - add salt to it once it boils.\nPut the spaghetti into the boiling water - they should be done in about 10 to 12 minutes.\nIn the meantime, heaten up some olive oil and add the cut onion.\nAfter 2 minutes, add the tomato pieces, salt, pepper and your other spices.\nThe sauce will be done once the spaghetti are.\nFeel free to add some cheese on top of the finished dish.",
         6.5,
         [
            'Butter one side of the white bread',
            'Layer ham, the pineapple and cheese on the white bread',
            'Bake the toast for round about 10 minutes in the oven at 200Â°C'
         ],
         "Crawling in my skin\r\nThese wounds, they will not heal\r\n\n\nFear is how I fall\r\nConfusing what is real\r\nThere's something inside me that pulls beneath the surface\r\nConsuming, confusing\r\nThis lack of self control I fear is never ending\r\nControlling\r\nI can't seem\r\nTo find myself again\r\nMy walls are closing in\r\n(Without a sense of confidence I'm convinced\r\nThat there's just too much pressure to take)\r\nI've felt this way before\r\nSo insecure\r\nCrawling in my skin\r\nThese wounds, they will not heal\r\nFear is how I fall\r\nConfusing what is real\r\nDiscomfort, endlessly has pulled itself upon me\r\nDistracting, reacting\r\nAgainst my will I stand beside my own reflection\r\nIt's haunting how I can't seem\r\nTo find myself again\r\nMy walls are closing in\r\n(Without a sense of confidence I'm convinced\r\nThat there's just…",
         false,
         true,
         false,
         false
    ),
    new Tour(
        "t2",
        ["p1"],
        ["c1"],
        "u2",
        "https://pbs.twimg.com/profile_images/990954136140120065/meJKt50X_400x400.jpg",
        "https://cdn1.ntv.com.tr/gorsel/VKEoxgDl5UyALbc91dZjKQ.jpg?width=1000&height=748&mode=crop&scale=both&v=20191015134847912",
        "https://cdn1.ntv.com.tr/gorsel/VKEoxgDl5UyALbc91dZjKQ.jpg?width=1000&height=748&mode=crop&scale=both&v=20191015134847912",
        "Galata Kulesi & Taksim Kültür Sanat ve Tarih Gezisi",
        4,
        [
            "English",
            "Turkish"
        ],
        "Ankara",
        "Doğa Gezintisi",
        250,
        "İstanbul'da mükemmel fotoğraflar,harika yerler bulmak için çok zaman harcadım.Birkaç ay sonra bölgeyi çok iyi tanıyorum ve istanbul'da insta için mükemmel olağanüstü fotoğraflar için en iyi yerlerin nerede olduğunu biliyorum\nModa fotoğrafçılığında nasıl poz verileceğini, kameraya nasıl bakılacağını ve doğal olarak nasıl etkileşime gireceğini öğrendim.\nfarklı kıyafetler getirebilir ve sürgünler arasında geçiş yapabilrisiniz. sanaa bazı şeyler öğreteceğim.",
         4,
         [
            'Butter one side of the white bread',
            'Layer ham, the pineapple and cheese on the white bread',
            'Bake the toast for round about 10 minutes in the oven at 200Â°C'
         ],
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisis gravida neque convallis a cras. Duis at tellus at urna condimentum. Est lorem ipsum dolor sit amet. Nisi est sit amet facilisis magna etiam. Convallis aenean et tortor at. Nisl vel pretium lectus quam. Faucibus vitae aliquet nec ullamcorper sit. Nisi quis eleifend quam adipiscing. Elementum pulvinar etiam non quam lacus suspendisse faucibus interdum. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Etiam non quam lacus suspendisse faucibus interdum posuere. Faucibus in ornare quam viverra orci sagittis eu volutpat. Quam nulla porttitor massa id neque aliquam vestibulum morbi blandit. Sit amet venenatis urna cursus eget nunc scelerisque viverra. Enim ut tellus elementum sagittis. Pharetra magna ac placerat vestibulum lectus mauris. Laoreet non curabitur gravida arcu ac tortor dignissim convallis aenean. Purus semper eget duis at tellus at. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam.",
        true,
        false,
        false,
        false
    ),
    
]


export const CATEGORIES = [
    new Category(
        "c1",
        "Doğa Gezintisi",
        "https://i4.hurimg.com/i/hurriyet/75/750x0/5da995ee2269a21f783e80c8",
        "Size aileden biri gibi davranan rehberlerle doğa gezintisinin keyfini çıkartın.",
        true,
        false,
        false,
        false
    ),
    new Category(
        "c2",
        "Kültür Gezintisi",
        "https://cdn2.enuygun.com/media/lib/825x620/uploads/image/efes-17431.jpeg",
        "Size aileden biri gibi davranan rehberlerle doğa gezintisinin keyfini çıkartın.",
        false,
        true,
        false,
        false
    ),
    new Category(
        "c3",
        "Fotoğraf Gezintisi",
        "https://cdn.kadin.com/images/posts/9/0/1/620x400/ruyada-fotograf-cekmek-ne-anlama-gelir-1567338116.jpg",
        "Size aileden biri gibi davranan rehberlerle doğa gezintisinin keyfini çıkartın.",
        false,
        false,
        true,
        false
    ),
    new Category(
        "c4",
        "Gece Hayatı",
        "https://neredekalinir.com/wp-content/uploads/2017/07/kiev.jpg",
        "Size aileden biri gibi davranan rehberlerle doğa gezintisinin keyfini çıkartın.",
        false,
        false,
        false,
        true,
    )
]

export const CITIES = [
    new Province(
        "p1",
        "Ankara",
        "https://www.buseterim.com.tr/upload/default/2019/11/9/30agustostrkiye680.jpg"
    ),
    new Province(
        "p2",
        "Çanakkale",
        "https://gtr.oksijentravel.com/userfiles/Media/TourImages/large/1100_Canakkale-_Gelibolu_65762.jpg"
    ),
    new Province(
        "p3",
        "Istanbul",
        "https://live.staticflickr.com/4716/39501131565_43654c86e3_b.jpg"
    ),
    new Province(
        "p4",
        "Sakarya",
        "https://seyyahdefteri.com/wp-content/uploads/2018/12/Sapanca-G%C3%B6l%C3%BC-Nerede-Nas%C4%B1l-Gidilir-Neler-Yap%C4%B1l%C4%B1r-700x420.jpg"
    ),
    new Province(
        "p5",
        "Antalya",
        "https://i.sozcu.com.tr/wp-content/uploads/2018/04/shutterstock_355370495.jpg"
    ),
    new Province(
        "p6",
        "Diyarbakır",
        "https://img-s2.onedio.com/id-53f8e17df11c88f77841b249/rev-0/w-635/listing/f-jpg-webp/s-27099370a2b15f6dfdddcd60126efc1449396665.webp"
    )
]