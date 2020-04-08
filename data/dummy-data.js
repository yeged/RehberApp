import Tour from "../models/tours"
import Category from "../models/Category"
import Province from "../models/City"

export const TOURS = [
    new Tour(
        "t1",
        ["p3"],
        ["c2"],
        "u1",
        "https://gezilecekyerler.com/wp-content/uploads/2017/03/Galata-Kulesi.jpg",
        "https://gezilecekyerler.com/wp-content/uploads/2017/03/Galata-Kulesi.jpg",
        "Galata Kulesi & Taksim Kültür Sanat ve Tarih Gezisi",
        4,
        [
            "English",
            "Turkish"
        ],
        "Istanbul",
        "Kültür Gezintisi",
        250,
        ['Cut the tomatoes and the onion into small pieces.',
        'Boil some water - add salt to it once it boils.',
        'Put the spaghetti into the boiling water - they should be done in about 10 to 12 minutes.',
        'In the meantime, heaten up some olive oil and add the cut onion.',
        'After 2 minutes, add the tomato pieces, salt, pepper and your other spices.',
        'The sauce will be done once the spaghetti are.',
        'Feel free to add some cheese on top of the finished dish.'],
         4,
         [
            'Butter one side of the white bread',
            'Layer ham, the pineapple and cheese on the white bread',
            'Bake the toast for round about 10 minutes in the oven at 200Â°C'
         ],
         [
            'Form 2 patties',
            'Fry the patties for c. 4 minutes on each side',
            'Quickly fry the buns for c. 1 minute on each side',
            'Bruch buns with ketchup',
            'Serve burger with tomato, cucumber and onion'
         ]
    ),
    new Tour(
        "t2",
        ["p1"],
        ["c1"],
        "u2",
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
        ['Cut the tomatoes and the onion into small pieces.',
        'Boil some water - add salt to it once it boils.',
        'Put the spaghetti into the boiling water - they should be done in about 10 to 12 minutes.',
        'In the meantime, heaten up some olive oil and add the cut onion.',
        'After 2 minutes, add the tomato pieces, salt, pepper and your other spices.',
        'The sauce will be done once the spaghetti are.',
        'Feel free to add some cheese on top of the finished dish.'],
         4,
         [
            'Butter one side of the white bread',
            'Layer ham, the pineapple and cheese on the white bread',
            'Bake the toast for round about 10 minutes in the oven at 200Â°C'
         ],
         [
            'Form 2 patties',
            'Fry the patties for c. 4 minutes on each side',
            'Quickly fry the buns for c. 1 minute on each side',
            'Bruch buns with ketchup',
            'Serve burger with tomato, cucumber and onion'
         ]
    ),
    new Tour(
        "t3",
        ["p1"],
        ["c1"],
        "u2",
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
        ['Cut the tomatoes and the onion into small pieces.',
        'Boil some water - add salt to it once it boils.',
        'Put the spaghetti into the boiling water - they should be done in about 10 to 12 minutes.',
        'In the meantime, heaten up some olive oil and add the cut onion.',
        'After 2 minutes, add the tomato pieces, salt, pepper and your other spices.',
        'The sauce will be done once the spaghetti are.',
        'Feel free to add some cheese on top of the finished dish.'],
         4,
         [
            'Butter one side of the white bread',
            'Layer ham, the pineapple and cheese on the white bread',
            'Bake the toast for round about 10 minutes in the oven at 200Â°C'
         ],
         [
            'Form 2 patties',
            'Fry the patties for c. 4 minutes on each side',
            'Quickly fry the buns for c. 1 minute on each side',
            'Bruch buns with ketchup',
            'Serve burger with tomato, cucumber and onion'
         ]
    ),
    new Tour(
        "t4",
        ["p1"],
        ["c1"],
        "u2",
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
        ['Cut the tomatoes and the onion into small pieces.',
        'Boil some water - add salt to it once it boils.',
        'Put the spaghetti into the boiling water - they should be done in about 10 to 12 minutes.',
        'In the meantime, heaten up some olive oil and add the cut onion.',
        'After 2 minutes, add the tomato pieces, salt, pepper and your other spices.',
        'The sauce will be done once the spaghetti are.',
        'Feel free to add some cheese on top of the finished dish.'],
         4,
         [
            'Butter one side of the white bread',
            'Layer ham, the pineapple and cheese on the white bread',
            'Bake the toast for round about 10 minutes in the oven at 200Â°C'
         ],
         [
            'Form 2 patties',
            'Fry the patties for c. 4 minutes on each side',
            'Quickly fry the buns for c. 1 minute on each side',
            'Bruch buns with ketchup',
            'Serve burger with tomato, cucumber and onion'
         ]
    ),
    new Tour(
        "t5",
        ["p1"],
        ["c1"],
        "u2",
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
        ['Cut the tomatoes and the onion into small pieces.',
        'Boil some water - add salt to it once it boils.',
        'Put the spaghetti into the boiling water - they should be done in about 10 to 12 minutes.',
        'In the meantime, heaten up some olive oil and add the cut onion.',
        'After 2 minutes, add the tomato pieces, salt, pepper and your other spices.',
        'The sauce will be done once the spaghetti are.',
        'Feel free to add some cheese on top of the finished dish.'],
         4,
         [
            'Butter one side of the white bread',
            'Layer ham, the pineapple and cheese on the white bread',
            'Bake the toast for round about 10 minutes in the oven at 200Â°C'
         ],
         [
            'Form 2 patties',
            'Fry the patties for c. 4 minutes on each side',
            'Quickly fry the buns for c. 1 minute on each side',
            'Bruch buns with ketchup',
            'Serve burger with tomato, cucumber and onion'
         ]
    ),
    new Tour(
        "t6",
        ["p1"],
        ["c1"],
        "u2",
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
        ['Cut the tomatoes and the onion into small pieces.',
        'Boil some water - add salt to it once it boils.',
        'Put the spaghetti into the boiling water - they should be done in about 10 to 12 minutes.',
        'In the meantime, heaten up some olive oil and add the cut onion.',
        'After 2 minutes, add the tomato pieces, salt, pepper and your other spices.',
        'The sauce will be done once the spaghetti are.',
        'Feel free to add some cheese on top of the finished dish.'],
         4,
         [
            'Butter one side of the white bread',
            'Layer ham, the pineapple and cheese on the white bread',
            'Bake the toast for round about 10 minutes in the oven at 200Â°C'
         ],
         [
            'Form 2 patties',
            'Fry the patties for c. 4 minutes on each side',
            'Quickly fry the buns for c. 1 minute on each side',
            'Bruch buns with ketchup',
            'Serve burger with tomato, cucumber and onion'
         ]
    ),
    new Tour(
        "t7",
        ["p1"],
        ["c1"],
        "u2",
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
        ['Cut the tomatoes and the onion into small pieces.',
        'Boil some water - add salt to it once it boils.',
        'Put the spaghetti into the boiling water - they should be done in about 10 to 12 minutes.',
        'In the meantime, heaten up some olive oil and add the cut onion.',
        'After 2 minutes, add the tomato pieces, salt, pepper and your other spices.',
        'The sauce will be done once the spaghetti are.',
        'Feel free to add some cheese on top of the finished dish.'],
         4,
         [
            'Butter one side of the white bread',
            'Layer ham, the pineapple and cheese on the white bread',
            'Bake the toast for round about 10 minutes in the oven at 200Â°C'
         ],
         [
            'Form 2 patties',
            'Fry the patties for c. 4 minutes on each side',
            'Quickly fry the buns for c. 1 minute on each side',
            'Bruch buns with ketchup',
            'Serve burger with tomato, cucumber and onion'
         ]
    ),
    new Tour(
        "t8",
        ["p1"],
        ["c1"],
        "u2",
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
        ['Cut the tomatoes and the onion into small pieces.',
        'Boil some water - add salt to it once it boils.',
        'Put the spaghetti into the boiling water - they should be done in about 10 to 12 minutes.',
        'In the meantime, heaten up some olive oil and add the cut onion.',
        'After 2 minutes, add the tomato pieces, salt, pepper and your other spices.',
        'The sauce will be done once the spaghetti are.',
        'Feel free to add some cheese on top of the finished dish.'],
         4,
         [
            'Butter one side of the white bread',
            'Layer ham, the pineapple and cheese on the white bread',
            'Bake the toast for round about 10 minutes in the oven at 200Â°C'
         ],
         [
            'Form 2 patties',
            'Fry the patties for c. 4 minutes on each side',
            'Quickly fry the buns for c. 1 minute on each side',
            'Bruch buns with ketchup',
            'Serve burger with tomato, cucumber and onion'
         ]
    ),
    new Tour(
        "t9",
        ["p1"],
        ["c1"],
        "u2",
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
        ['Cut the tomatoes and the onion into small pieces.',
        'Boil some water - add salt to it once it boils.',
        'Put the spaghetti into the boiling water - they should be done in about 10 to 12 minutes.',
        'In the meantime, heaten up some olive oil and add the cut onion.',
        'After 2 minutes, add the tomato pieces, salt, pepper and your other spices.',
        'The sauce will be done once the spaghetti are.',
        'Feel free to add some cheese on top of the finished dish.'],
         4,
         [
            'Butter one side of the white bread',
            'Layer ham, the pineapple and cheese on the white bread',
            'Bake the toast for round about 10 minutes in the oven at 200Â°C'
         ],
         [
            'Form 2 patties',
            'Fry the patties for c. 4 minutes on each side',
            'Quickly fry the buns for c. 1 minute on each side',
            'Bruch buns with ketchup',
            'Serve burger with tomato, cucumber and onion'
         ]
    ),
    
]


export const CATEGORIES = [
    new Category(
        "c1",
        "Doğa Gezintisi",
        "https://i4.hurimg.com/i/hurriyet/75/750x0/5da995ee2269a21f783e80c8",
        "Size aileden biri gibi davranan rehberlerle doğa gezintisinin keyfini çıkartın."
    ),
    new Category(
        "c2",
        "Kültür Gezintisi",
        "https://cdn2.enuygun.com/media/lib/825x620/uploads/image/efes-17431.jpeg",
        "Size aileden biri gibi davranan rehberlerle doğa gezintisinin keyfini çıkartın."
    ),
    new Category(
        "c3",
        "Fotoğraf Gezintisi",
        "https://cdn.kadin.com/images/posts/9/0/1/620x400/ruyada-fotograf-cekmek-ne-anlama-gelir-1567338116.jpg",
        "Size aileden biri gibi davranan rehberlerle doğa gezintisinin keyfini çıkartın."
    ),
    new Category(
        "c4",
        "Gece Hayatı",
        "https://neredekalinir.com/wp-content/uploads/2017/07/kiev.jpg",
        "Size aileden biri gibi davranan rehberlerle doğa gezintisinin keyfini çıkartın."
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