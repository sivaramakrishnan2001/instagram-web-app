
export const APIsPath = {

    BaseUrl: 'http://localhost:2000',
    // BaseUrl: process.env.REACT_APP_BASE_URL,


    // Authentication
    SignUp: '/signup',
    Login: '/login',
    FirebaseAuthentication:'/firebaseAuthentication',

    GetUser: '/user/',
    GetUsers: "/users",
    Follow: '/user/follow',
    UnFollow: "/user/unfollow",
    Removefollower: "/user/removefollower",
    GetProfile: '/user/getprofile',
    UpdateProfile: '/user/updateprofile',

    // chats 
    GetMessages: '/getMessages',


    // post
    AllPost: '/allpost',
    Post: '/createPost',
    DeletePost: '/post/delete',
    LikePost: '/post/like',
    UnLikePost: '/post/unlike',
    SavePost: "/post/save",
    UnSavePost: "/post/unsave",
    CommentPost: '/post/comment',
    GetUserPost: "/post/userPost/",

    // save
    GetAllSave: '/save/getAll',

    // like
    GetAllLikes: '/like/getAll',

    // songs
    UploadSong: '/uploadsong',
    GetAllSongs: '/allsongs',

    // reels
    GetAllReels: "/post/getAllReels",
    CreateReels: "/post/createReels",
    UpdateReels: "/post/updateReels",
    DeleteReels: "/post/deleteReels",

    // stickyNotes

    CreateStickyNotes: "/createStickyNotes",
    GetAllStickyNotes: "/getAllStickyNotes",
    GetStickyNotes: "/getStickyNotes",
    DeleteStickyNotes: "/stickyNotes/delete/",
    DeleteAllStickyNotes: "/stickyNotes/delete/",

    // storys

    CreateStory: "/story/create",
    GetAllStorys: "/story/getAll",
    DeleteStory: "/story/delete",
    LikeStory: "/story/like",
    UnlikeStory: "/story/unlike",



}
