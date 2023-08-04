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
                    let newPost = newPostDOM(data.data.post,data.data.creater);
                    let postsUl = $("#post-container>ul");
                    postsUl.prepend(newPost);
                    let deletePostBtn = $(" .delete-post-button", newPost);
                    deletePost(deletePostBtn);
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

    createPost();
}