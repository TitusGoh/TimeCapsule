db = db.getSiblingDB('capsuleData')
db.createCollection('capsuleList')
capsuleCollection = db.getCollection("capsuleList")
capsuleCollection.remove({})
capsuleCollection.insert(
{
        name: "Wedding Memory",
        description: "Memories from the wedding",
        capsuleID: "1",
        createdDate: "04-27-2015",
        openDate: "06-27-2024",
        completed: true,
        owner: "titusgoh",
        fileName: ["image1.jpg", "image2.jpg"]
}
)
capsuleCollection.insert(
{
        name: "Graduation Memory",
        description: "Memories from high school graduation",
        capsuleID: "2",
        createdDate: "04-27-2005",
        openDate: "08-27-2006",
        completed: false,
        owner: "seanli",
        fileName: ["groupPicture.jpg"]
}
)