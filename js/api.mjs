/*  ******* Data types *******
    image objects must have at least the following attributes:
        - (String) imageId 
        - (String) title
        - (String) author
        - (String) url
        - (Date) date

    comment objects must have the following attributes
        - (String) commentId
        - (String) imageId
        - (String) author
        - (String) content
        - (Date) date

****************************** */

//Create a unique counter
let counter = localStorage.getItem("Counter");

if (!counter) {
    counter = 0;
    localStorage.setItem("Counter", counter);
}

console.log(localStorage.getItem("Counter"));


// add an image to the gallery
export function addImage(img_title, img_author, img_url) {


    //Retrieve the image array

    let images = JSON.parse(localStorage.getItem("Images"));

    if (images == null) {
        images = [];
    }

    let counter = localStorage.getItem("Counter");

    console.log("counter:" + counter);

    const image = {
        title: img_title,
        author: img_author,
        url: img_url,
        date: new Date(),
        imageId: String(counter)
    };

    //Update counter 
    counter++;
    localStorage.setItem("Counter", counter);

    console.log("Image id:" + image.imageId);


    images.push(image);

    //Store the image array
    localStorage.setItem("Images", JSON.stringify(images));

    //Create the corresponding comment section for the image
    let msgs = JSON.parse(localStorage.getItem("Messages"));

    if (!msgs) {
        msgs = [];
    }

    let new_comment = {
        counter: 0, //for assigning ids to comments
        id: image.imageId,
        comments: []
    }

    msgs.push(new_comment);

    localStorage.setItem("Messages", JSON.stringify(msgs));

    return image;
}

// delete an image from the gallery given its imageId
export function deleteImage(imageId) {
    let images = JSON.parse(localStorage.getItem("Images"));

    if (!images || images.length == 0) {
        return;
    }

    for (let i = 0; i < images.length; i++) {
        if (images[i].imageId == imageId) {
            images.splice(i, 1);
            break;
        }
    }

    //Store the image array
    localStorage.setItem("Images", JSON.stringify(images));

    //Delete the corresponding comment secion
    let msgs = JSON.parse(localStorage.getItem("Messages"));

    for (let i = 0; i < msgs.length; i++) {
        if (msgs[i].id = imageId) {
            msgs.splice(i, 1);
            localStorage.setItem("Messages", JSON.stringify(msgs));
            break;
        }
    }

}

// add a comment to an image
export function addComment(imageId, author, content) {
    let msgs = JSON.parse(localStorage.getItem("Messages"));

    for (let i = 0; i < msgs.length; i++) {
        
        let msg = msgs[i];
        if (msg.id == imageId) {
            console.log(imageId + msg.counter);
            const new_comment = {
                commentId: msg.counter,
                imageId: imageId,
                author: author,
                content: content,
                date: new Date()
            }
            console.log("added"+ new_comment.commentId + new_comment.imageId);
            msg.counter = ++msg.counter;
            msg.comments.push(new_comment);
            localStorage.setItem("Messages", JSON.stringify(msgs));
            break;
        }
    }

}

// delete a comment to an image
export function deleteComment(commentId, imageId) {
    let msgs = JSON.parse(localStorage.getItem("Messages"));

    for (let i = 0; i < msgs.length; i++) {
        let msg = msgs[i];

        if (msg.id == imageId) {
            let comments = msg.comments;

            for (let j = 0; j < comments.length; j++) {
                if (comments[j].commentId == commentId) {
                    comments.splice(j, 1);
                    localStorage.setItem("Messages", JSON.stringify(msgs));
                    break;
                }
            }
        }
    }

}

export function get_latest_image() {
    let images = JSON.parse(localStorage.getItem("Images"));
    if (!images) {
        return null;
    }

    const latested = images.length - 1;

    return images[latested];
}

export function get_next_image(imageId) {
    let images = JSON.parse(localStorage.getItem("Images"));

    for (let i = 0; i < images.length; i++) {
        if (images[i].imageId == imageId) {
            if (i == images.length - 1) {
                return null;
            }
            return images[i + 1];
        }
    }
    return null;
}


export function get_previous_image(imageId) {
    let images = JSON.parse(localStorage.getItem("Images"));

    for (let i = 0; i < images.length; i++) {
        if (images[i].imageId == imageId) {
            if (i == 0) {
                return null;
            }
            return images[i - 1];
        }
    }
    return null;
}


export function get_comment(imageId) {
    let msgs = JSON.parse(localStorage.getItem("Messages"));

    if(!msgs){
        return null;
    }

    for(let i = 0; i < msgs.length; i++){
        if(msgs[i].id == imageId){
            return msgs[i].comments;
        }
    }
    return null;
}

