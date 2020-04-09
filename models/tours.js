class Tour {
    constructor(id,tCityId, tCategoryId, profileId,profileImg, Image, tourImage, tourName, time, language, city, category, price, tourPlan, groupSize, userComment, personalDetail) {
                this.id = id, 
                this.tCityId = tCityId,
                this.tCategoryId = tCategoryId,
                this.profileId = profileId,
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
                this.personalDetail = personalDetail
    }
}
export default Tour