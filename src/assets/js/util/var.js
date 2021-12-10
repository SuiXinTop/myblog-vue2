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

export const editorOption = {
  theme: "snow",
  placeholder: "请在这里输入",
  modules: {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction
        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ["link", "image", "video"],
        ["clean"],
      ],
      handlers: {
        image: function (value) {
          if (value) {
            document.getElementById("upload-chat").click();
          } else {
            this.quill.format("image", false);
          }
        },
      },
    },
  },
};

export const CommentOption = {
  theme: "snow",
  placeholder: "请在这里输入",
  modules: {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        ["link", "clean", "file"],
      ],
      handlers: {
        file: function () {},
      },
    },
  },
};
