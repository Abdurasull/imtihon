export const filenames = (req) => {
    return Date.now() + req.files.video.name;
}

export const avatarfilenames = (req) => {
    return Date.now() + req.files.image.name;
}