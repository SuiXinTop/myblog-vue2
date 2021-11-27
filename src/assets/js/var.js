//交互用到的对象
export let MyBlog = {
  blogId: "",
  userId: "",
  userTab: {
    userId: 0,
    nickName: "",
    name: "",
    password: "",
    email: "",
    sex: "",
    position: "",
    images: "",
    sign: "",
    registerTime: "",
    integral: "",
    attentionNumber: 0,
    friendNumber: 0,
    collectNumber: 0,
    blogNumber: 0,
    lastLogin: 0,
    birthday: "",
    state: "",
  },
  browserNum: 0,
  commentNum: 0,
  collectNum: 0,
  likeNum: 0,
  recordDate: "",
  body: "",
  title: "",
  image: "",
  state: "",
  tag: "",
};

export let comment = [
  {
    commentId: 0,
    blogId: 0,
    userId: 0,
    userTab: {
      userId: 0,
      nickName: "",
      name: "",
      password: "",
      email: "",
      sex: "",
      position: "",
      images: "",
      sign: "",
      registerTime: "",
      integral: "",
      attentionNumber: 0,
      friendNumber: 0,
      collectNumber: 0,
      blogNumber: 0,
      lastLogin: "",
      birthday: "",
      state: 0,
    },
    blogUserId: 0,
    recordDate: "",
    body: "",
    likeNum: 0,
    state: "",
  },
];
