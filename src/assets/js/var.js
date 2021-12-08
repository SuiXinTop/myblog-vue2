//交互用到的对象
export let blog = {
  blogId: "",
  blogTitle: "",
  blogBody: "",
  blogImg: "",
  blogTime: null,
  blogUpdateTime: null,
  blogTagList: {
    tag: {
      tagId: "",
      tagName: "",
    },
  },
  user: {},
  blogCollect: 0,
  blogView: 0,
  blogLike: 0,
  blogComment: 0,
  blogState: 0,
  userId: null,
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
