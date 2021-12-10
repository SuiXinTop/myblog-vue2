//交互用到的对象

export let restMsg = { code: null, msg: null, data: null };

export let LoginResponse = {
  token: null,
  userVo: user,
};

export let emailCode = {
  email: null,
  code: null,
};

export let webSocketMsg = {
  user: user,
  msgContent: null,
  msgTime: null,
};

export let announcement = {
  amtId: null,
  amtTitle: null,
  amtBody: null,
  amtTop: null,
  amtTime: null,
  amtState: null,
};

export let sysLog = {
  logId: null,
  logName: null,
  businessType: null,
  methodName: null,
  requestMethod: null,
  operName: null,
  operType: null,
  operIp: null,
  operUrl: null,
  operStatus: null,
  errorMsg: null,
  operTime: null,
};

export let user = {
  userId: null,
  userName: null,
  userPassword: null,
  userImg: null,
  userEmail: null,
  userAddress: null,
  userSex: null,
  userState: null,
  loginIp: null,
  loginTime: null,
  registerTime: null,
  roleId: 0,
  role: role,
};

export let role = { roleId: null, roleKey: null, roleName: null };

export let blog = {
  blogId: null,
  blogTitle: null,
  blogBody: null,
  blogImg: null,
  blogTime: null,
  blogUpdateTime: null,
  blogTagList: blogTagList,
  user: user,
  blogCollect: null,
  blogView: null,
  blogLike: null,
  blogComment: null,
  blogState: null,
  userId: null,
};

export let blogList = [blog];

export let blogTagList = [blogTag];

export let blogTag = { blogTagId: null, blogId: null, tagId: null, tag: tag };

export let tag = {
  tagId: null,
  tagName: null,
};

export let collect = {
  collectId: null,
  blogId: null,
  blog: blog,
  userId: null,
  collectTime: null,
  collectState: null,
};

export let comment = {
  comId: null,
  blogId: null,
  comOwner: null,
  owner: user,
  comBody: null,
  comTime: null,
  comState: null,
  replyList: replyList,
};

export let reply = {
  replyId: null,
  comId: null,
  replyOwner: null,
  owner: user,
  replyBody: null,
  replyTime: null,
  replyState: null,
};

export let commentList = [comment];

export let replyList = [reply];

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
  placeholder: "Ctrl+Enter发布评论",
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
