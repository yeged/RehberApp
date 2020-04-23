class Tour {
    constructor(id,tCityId, tCategoryId, ownerId,profileImg, Image, tourImage, tourName, time, language, city, category, price, tourPlan, groupSize, userComment, personalDetail, isNatural, isCultural, isPhotography, isNightlife) {
                this.id = id, 
                this.tCityId = tCityId,
                this.tCategoryId = tCategoryId,
                this.ownerId = ownerId,
                this.profileImg = profileImg, 
                this.Image = Image, 
                this.tourImage = tourImage, 
                this.tourName = tourName, 
                this.time = time, 
                this.language = language, 
                this.city = city, 
                this.category = category,
                this.price = price, 
                this.tourPlan = tourPlan, 
                this.groupSize = groupSize, 
                this.userComment = userComment, 
                this.personalDetail = personalDetail,
                this.isNatural = isNatural,
                this.isCultural = isCultural,
                this.isPhotography = isPhotography,
                this.isNightlife = isNightlife
    }
}
export default Tour

