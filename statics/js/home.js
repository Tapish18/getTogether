{
    // this method creates a post in db!
    let createPost = function(){
        let postForm = $("#post-form");
    
        postForm.submit(function(event){
            event.preventDefault();
            // console.log("Submit Stopped!!");
            // Now make an AJAX post request
            $.ajax({
                type : "post",
                url : "/posts/createpost",
                data : postForm.serialize(),
                success : function(data){
                    // console.log(data);
                    console.log(data.message)
                    if(data.message){
                        console.log("inner func called");
                        new Noty({
                            text : data.message,
                            type : "success",
                            theme : "relax",
                            timeout: 1500,
                            layout: "topRight"
                        }).show()
                            
                    }
                    let newPost = newPostDOM(data.data.post,data.data.creater);
                    let postsUl = $("#post-container>ul");
                    postsUl.prepend(newPost);
                    postForm[0][0]["value"] = "";
                    let deletePostBtn = $(" .delete-post-button", newPost);
                    deletePost(deletePostBtn);

                    let cmtform = $("#latest-feed>li form")[0];
                    createComment(cmtform);
                },
                error : function(error){
                    console.log(error.responseText);
                }
            });
    
        });
    }

    // This method creates a post in DOM
    let newPostDOM = function(post,creater){
        return $(`<li id="post-${post._id}">
        ${post.content}
        <br>
        <small>
            ${creater.name}
        </small>
        <br>
    
        
        
        
        <div class="detete-btn">
            <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete Post</a>
        </div>
        
        
        <br>
        <div class="comment-form">
            <form action="/comment/create" method="post">
                <input type="text" name="content" placeholder="Type Your Comment Here..." required>
                <input type="hidden" name="post" value=${post._id}>
                <input type="submit" value="Add Comment">
            </form>
        </div>
        <br>
        <ul id="post-comments-${post._id}">
        
        </ul>
        
    
        
    </li>`)
    }


    


    // Deletion of Post;

    let deletePost = function(deleteLink){ // deleteLink is an anchor tag in this case
        $(deleteLink).click(function(event){
            event.preventDefault();
            $.ajax({
                type : "get",
                url : $(deleteLink).prop("href"),
                success : function(data){
                    if(data.message){
                        console.log("inner func called");
                        new Noty({
                            text : data.message,
                            type : "success",
                            theme : "relax",
                            timeout: 1500,
                            layout: "topRight"
                        }).show();
                    }
                    let post_id = data.data.post_id;
                    $(`#post-${post_id}`).remove();
                    console.log(data.message);
                },
                error : function(error){
                    console.log(error);
                }
            })
        })
    }

    let deleteButtonsList = $(".delete-post-button");

    for (let a of deleteButtonsList){
        deletePost(a);
    }


    // Ajax requests for comments

    let createComment = function(addCommentLink){
        console.log("createdComment Called");
        $(addCommentLink).submit(function(event){
            event.preventDefault();
            $.ajax({
                type : "post",
                url : "/comment/create",
                data : $(addCommentLink).serialize(),
                success : function(data){
                    let myNewComment = createCommentDOM(data.data.newComment,data.data.commentCreater,data.data.postCreator);
                    let desiredPostCommentSection = $(`#post-comments-${data.data.newComment.post}`);
                    deleteComment($(myNewComment).find(".delete-comment-button"));
                    desiredPostCommentSection.prepend(myNewComment);
                    $(addCommentLink)[0][0]["value"] = "";

                    

                    if(data.message){
                        new Noty({
                            type : "success",
                            theme : "relax",
                            text : data.message,
                            layout : "topRight",
                            timeout : 1500
                        }).show();
                    }
                    
                },
                error : function(err){
                    console.log("Error Occurred : ",err);
                }
            })
        })
    }


    const createCommentDOM = function(createdcmt , cmtMaker,postCreator){
        return `
        <p>
        <li>
            ${createdcmt.content} &nbsp;
            <small>
                By : 
                ${cmtMaker}
            </small>
            <a class= "delete-comment-button" href="/comment/destroy?post_id=${postCreator}&cmt_id=${createdcmt._id}">Delete Comment</a>
            
            
        </li>
        </p>`
    }

    // delete Comment

    let deleteComment = function(deleteCommentLink){
        $(deleteCommentLink).click(function(event){
            event.preventDefault();
            $.ajax({
                type : "get",
                url : $(deleteCommentLink).prop("href"),
                success : function(data){
                    let myCommentId = data.data.cmt_id
                    let desiredComment = $(`#comment-${myCommentId}`);
                    $(desiredComment).remove();

                    if(data.message){
                        new Noty({
                            type: "success",
                            theme : "relax",
                            text : data.message,
                            layout : "topRight",
                            timeout : 1500
                        }).show()
                    }
                },
                error : function(error){
                    console.log("Error Occurred : ",error);
                }
            })
        })
    }


    let deteteCommentLinksInDOM = $(".delete-comment-button")

    for (let btn of deteteCommentLinksInDOM){
        deleteComment(btn);
    }




    let addCommentForms = $(".comment-form form")

    for (let form of addCommentForms){
        createComment(form);
    }






    createPost();
}