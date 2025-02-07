import moment from 'moment';

const fileFormat = (url) => {
    const fileExtension = url.split(".").pop();

    if (fileExtension === "mp4" || fileExtension === "webm" || fileExtension === "ogg") {
        return "video"
    }
    if (fileExtension === "mp3" || fileExtension === "web") {
        return "audio"
    }
    if (fileExtension === "png" ||
        fileExtension === "jpg" ||
        fileExtension === "jpeg" ||
        fileExtension === "gif" 
        ) {
        return "image"
    }
    return "file";
};
const transformImage = (url = '', width = 100) => {
    const newurl = url.replace("upload/",`upload/dpr_auto/w_${width}`)
    
    return newurl;
};

const getlast7dyas = () => {
    const currentDate = moment();
    const last7days = []
    for (let i = 0; i < 7; i++){
        const dayDtae = currentDate.clone().subtract(i, "days")
        const dayname = dayDtae.format("dddd");

        last7days.unshift(dayname);
    }
    return last7days
}
const getOrSaveFromStorage = ({ key, value, get }) => {
    if (get) {
        return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
    }
    else localStorage.setItem(key, JSON.stringify(value));
}

export { fileFormat, getlast7dyas, getOrSaveFromStorage, transformImage };

