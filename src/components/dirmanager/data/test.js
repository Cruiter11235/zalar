//script
new Vue({
  el: "#app",
  data: function () {
    return {
      code: "", //codemirror值
      editor: "", //codemirror
      codeType: "", //代码类型

      list: [], //树结构--数组
      props: {
        label: "name", //指定节点标签为节点对象的某个属性值
        children: "zones", //指定子树为节点对象的某个属性值
        isLeaf: "leaf", //指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
      },

      prev_path: "", // 预览路径
      curr_clickData: {}, //当前点击数据
      curr_node: {}, //当前点击节点
      curr_file: "", //当期那编辑器内的文件
    };
  },
  methods: {
    //当点击的是最末级节点的时候，获取此节点的id赋值给列表对象的属性，再调用load方法来实现过滤查询的功能。
    handleBucketClick: function (data, node) {
      console.log("点击节点", data, node, this.list);
      //dir:定义的是否是文件夹类型（DIR：文件夹，FILE：文件）
      if (!data.dir) {
        this.getTreeData(node, "FILE", data.pathName, ""); // 这里返回的是子节点childens集合
        this.codeType = data.id.split(".")[data.id.split(".").length - 1]; //判断当前代码文件是什么类型

        this.curr_file = data.pathName;
        this.prev_path = data.pathName; // 预览
        this.curr_clickData = data; //当前点击数据
        this.curr_node = node; //当前点击数据
      }
    },
    //
    loadNode(node, resolve) {
      // 初始状态0---第一次触发
      if (node.level === 0) {
        this.getTreeData("L0", "DIR", "", "", resolve); // 这里返回的格式为 [{...}]
      } else {
        if (!node.data.dir) {
          // 不是根节点
          return resolve([]); //返回[]停止转圈
        } else {
          //如果是根节点
          if (node.level > 0) {
            setTimeout(() => {
              this.getTreeData(node, "DIR", node.data.pathName, "", resolve); // 这里返回的是子节点childens集合
            }, 200);
          }
        }
      }
    },
    // 初始
    getTreeData: function (node, opt, path, content, resolve) {
      var that = this;
      // console.log(node);
      var loadIcon1 = layer.load(2);
      var d = {
        opt: opt,
        path: path,
        content: content,
      };
      $.ajax({
        type: "POST",
        url: "/FileEdit",
        data: JSON.stringify(d),
        contentType: "application/json; utf-8",
        timeout: 10000,
        success: function (data1) {
          // console.log(data1);
          layer.close(loadIcon1);
          var res = $.parseJSON(data1);
          // console.log(res);
          if (res.rt == 0) {
            if (opt === "DIR") {
              //第一级
              if (node === "L0") {
                var arr1 = [];
                var arr2 = [];
                for (var i = 0; i < res.data.length; i++) {
                  //根据是否文件夹拼接数组：目的文件夹排在上面；文件排在下面（美观）；没有这个需求可以不分开拼接，直接push
                  if (res.data[i].dir) {
                    arr1.push({
                      name: res.data[i].fileName, //文件名
                      label: res.data[i].fileName, //文件名
                      id: res.data[i].pathName,
                      pathName: res.data[i].pathName, //路径
                      // 'level': 0,//等级
                      dir: res.data[i].dir, //是否目录
                      read: res.data[i].read, //是否可读
                      children: [],
                      leaf: false,
                    });
                  } else {
                    arr2.push({
                      name: res.data[i].fileName, //文件名
                      title: res.data[i].fileName, //文件名
                      spread: false, //默认展开
                      id: res.data[i].pathName,
                      pathName: res.data[i].pathName, //路径
                      //  'level': 0,//等级
                      dir: res.data[i].dir, //是否目录
                      read: res.data[i].read, //是否可读
                      children: [],
                      leaf: true, //TRUE：叶子结点（没有子节点）
                    });
                  }
                }

                that.list = that.list.concat(arr1).concat(arr2);
                return resolve(that.list);
              } else {
                //递归查找到当前元素--插入children
                var result = null;
                // 再去查找当前元素的子元素插入
                for (let obj of that.list) {
                  result = that.dfs(obj, node.data.id); //调用函数查找
                  if (result) {
                    break;
                  }
                }
                // console.log(result);
                var arr1 = [];
                var arr2 = [];
                for (var i = 0; i < res.data.length; i++) {
                  if (res.data[i].dir) {
                    arr1.push({
                      name: res.data[i].fileName, //文件名
                      label: res.data[i].fileName, //文件名
                      id: res.data[i].pathName,
                      pathName: res.data[i].pathName, //路径
                      // 'level': 0,//等级
                      dir: res.data[i].dir, //是否目录
                      read: res.data[i].read, //是否可读
                      children: [],
                      leaf: false,
                    });
                  } else {
                    arr2.push({
                      name: res.data[i].fileName, //文件名
                      title: res.data[i].fileName, //文件名
                      spread: false, //默认展开
                      id: res.data[i].pathName,
                      pathName: res.data[i].pathName, //路径
                      //  'level': 0,//等级
                      dir: res.data[i].dir, //是否目录
                      read: res.data[i].read, //是否可读
                      children: [],
                      leaf: true, //TRUE：叶子结点（没有子节点）
                    });
                  }
                }
                result.children = result.children.concat(arr1).concat(arr2);
                return resolve(result.children);
              }
            }
            if (opt === "FILE") {
              //如果是文件类型，直接赋值给编辑器
              that.editor.setValue(unescape(decodeURI(res.data)));
            }
          } else if (res.rt == -1) {
            //错误信息
            layer.open({
              title: "错误信息",
              icon: 2,
              content: data.msg,
            });
          }
        },
        error: function (xhr, type) {
          layer.close(loadIcon1);
          layer.msg("错误", { icon: 0, skin: "error_msg", time: 3000 }); // success_msg; error_msg;warn_msg;
        },
      });
    },
    // 动态操作--时获取数据（去掉了resolve（不知道是干什么的，不加有问题，））
    getTreeData1: function (node, opt, path, content) {
      var that = this;
      var loadIcon1 = layer.load(2);
      var d = {
        opt: opt,
        path: path,
        content: content,
      };
      $.ajax({
        type: "POST",
        url: "/FileEdit",
        data: JSON.stringify(d),
        contentType: "application/json; utf-8",
        timeout: 10000,
        success: function (data1) {
          // console.log(data1);
          layer.close(loadIcon1);
          var res = $.parseJSON(data1);
          // console.log(res);
          if (res.rt == 0) {
            if (opt === "DIR") {
              if (node === "L0") {
                that.list = []; //清空list数组：因为操作第一级数据之后需要重新获取
                var arr1 = [];
                var arr2 = [];
                for (var i = 0; i < res.data.length; i++) {
                  if (res.data[i].dir) {
                    arr1.push({
                      name: res.data[i].fileName, //文件名
                      label: res.data[i].fileName, //文件名
                      id: res.data[i].pathName,
                      pathName: res.data[i].pathName, //路径
                      // 'level': 0,//等级
                      dir: res.data[i].dir, //是否目录
                      read: res.data[i].read, //是否可读
                      children: [],
                      leaf: false,
                    });
                  } else {
                    arr2.push({
                      name: res.data[i].fileName, //文件名
                      title: res.data[i].fileName, //文件名
                      spread: false, //默认展开
                      id: res.data[i].pathName,
                      pathName: res.data[i].pathName, //路径
                      //  'level': 0,//等级
                      dir: res.data[i].dir, //是否目录
                      read: res.data[i].read, //是否可读
                      children: [],
                      leaf: true, //TRUE：叶子结点（没有子节点）
                    });
                  }
                }
                that.list = that.list.concat(arr1).concat(arr2);

                return that.list;
              } else {
                //这里不能再去递归到当前元素了，因为动态增加和删除后需要给当前元素的父级的children清空，所以去递归父级
                // var result = null;
                // // 再去查找当前元素的子元素插入
                // console.log(that.list);
                // for (let obj of that.list) {
                //     result = that.dfs(obj, node.data.id); //调用函数查找
                //     if (result) {
                //         break
                //     }
                // }
                // console.log(result);//这个是当前文件
                //调用函数---找出父级（数组：[父级1，父级2，父级3，...当前元素的父级，当前元素];）
                //清空时给倒数第二个当前元素的父级children清空；
                var arr = that.searchParent(that.list, node.data.id);
                // console.log(arr);
                arr[arr.length - 2].children = [];

                var arr1 = [];
                var arr2 = [];
                for (var i = 0; i < res.data.length; i++) {
                  if (res.data[i].dir) {
                    arr1.push({
                      name: res.data[i].fileName, //文件名
                      label: res.data[i].fileName, //文件名
                      id: res.data[i].pathName,
                      pathName: res.data[i].pathName, //路径
                      // 'level': 0,//等级
                      dir: res.data[i].dir, //是否目录
                      read: res.data[i].read, //是否可读
                      children: [],
                      leaf: false,
                    });
                  } else {
                    arr2.push({
                      name: res.data[i].fileName, //文件名
                      title: res.data[i].fileName, //文件名
                      spread: false, //默认展开
                      id: res.data[i].pathName,
                      pathName: res.data[i].pathName, //路径
                      //  'level': 0,//等级
                      dir: res.data[i].dir, //是否目录
                      read: res.data[i].read, //是否可读
                      children: [],
                      leaf: true, //TRUE：叶子结点（没有子节点）
                    });
                  }
                }
                arr[arr.length - 2].children = arr[arr.length - 2].children
                  .concat(arr1)
                  .concat(arr2);
                return arr[arr.length - 2].children;
              }
            }
            if (opt === "FILE") {
              that.editor.setValue(unescape(decodeURI(res.data)));
            }
          } else if (res.rt == -1) {
            //错误信息
            layer.open({
              title: "错误信息",
              icon: 2,
              content: data.msg,
            });
          }
        },
        error: function (xhr, type) {
          layer.close(loadIcon1);
          layer.msg("错误", { icon: 0, skin: "error_msg", time: 3000 }); // success_msg; error_msg;warn_msg;
        },
      });
    },
    // 递归查找
    dfs: function (obj, targetId) {
      if (obj.id == targetId) {
        return obj;
      }
      if (obj.children) {
        for (let item of obj.children) {
          let check = this.dfs(item, targetId);
          if (check) {
            return check;
          }
        }
      }
      return null;
    },
    // 递归查找父级
    searchParent(map, id) {
      var that = this;
      let t = [];
      for (let i = 0; i < map.length; i++) {
        const e = map[i];
        if (e.id === id) {
          //若查询到对应的节点，则直接返回
          t.push(e);
          break;
        } else if (e.children && e.children.length !== 0) {
          //判断是否还有子节点，若有对子节点进行循环调用
          let p = that.searchParent(e.children, id);
          //若p的长度不为0，则说明子节点在该节点的children内，记录此节点，并终止循环
          if (p.length !== 0) {
            p.unshift(e);
            t = p;
            break;
          }
        }
      }
      return t;
    },

    // 刷新树节点
    refreshTreeNode: function (node) {
      let id = node.parent.id;
      if (id && id !== "0") {
        // 新增或修改时,更新当前节点
        node.loaded = false;
        node.loadData(); // 重新查询当前节点的所有子元素

        // 删除时, 更新父级节点
        node.parent.loaded = false;
        node.parent.loadData();

        this.getTreeData1(node, "DIR", node.parent.data.pathName, ""); // 这里返回的是子节点childens集合
      } else {
        // L0节点
        this.getTreeData1("L0", "DIR", "", ""); // 这里返回的格式为 [{...}]
      }
    },
    // 新增
    add() {
      layer.open({
        title: "新增",
        type: 2,
        // shade: 0.2,
        // maxmin: true,
        shadeClose: true,
        area: ["50%", "80%"],
        content: "./add.html",
        end: function () {
          location.reload();
        },
      });
    },
    // 保存文件
    saveFile() {
      if (JSON.stringify(this.curr_clickData) !== "{}") {
        if (this.curr_clickData.dir) {
          layer.msg("不能保存文件夹！", {
            icon: 0,
            skin: "warn_msg",
            time: 3000,
          }); // success_msg; error_msg;warn_msg;
        } else {
          var loadIcon1 = layer.load(2);
          var d = {
            opt: "SAVE_FILE",
            path: this.prev_path,
            content: encodeURIComponent(this.editor.getValue()),
          };
          // console.log(d);
          $.ajax({
            type: "POST",
            url: "/FileEdit",
            data: JSON.stringify(d),
            contentType: "application/json",
            timeout: 10000,
            success: function (data1) {
              // console.log(data1);
              layer.close(loadIcon1);
              var res = $.parseJSON(data1);
              // console.log(res);
              if (res.rt == 0) {
                layer.msg("保存成功！", {
                  icon: 0,
                  skin: "success_msg",
                  time: 3000,
                }); // success_msg; error_msg;warn_msg;
              } else if (res.rt == -1) {
                //错误信息
                layer.open({
                  title: "错误信息",
                  icon: 2,
                  content: data1.msg,
                });
              }
            },
            error: function (xhr, type) {
              layer.close(loadIcon1);
              layer.msg("错误", { icon: 0, skin: "error_msg", time: 3000 }); // success_msg; error_msg;warn_msg;
            },
          });
        }
      }
    },
    // 删除
    delFile() {
      var that = this;
      if (JSON.stringify(that.curr_clickData) !== "{}") {
        if (that.curr_clickData.dir) {
          layer.msg("不能删除文件夹！", {
            icon: 0,
            skin: "warn_msg",
            time: 3000,
          }); // success_msg; error_msg;warn_msg;
        } else {
          layer.confirm("确定要删除文件吗？", function (index) {
            var loadIcon1 = layer.load(2);
            var d = {
              opt: "DEL_FILE",
              path: that.prev_path,
            };
            // console.log(d);
            $.ajax({
              type: "POST",
              url: "/FileEdit",
              data: JSON.stringify(d),
              contentType: "application/json",
              timeout: 10000,
              success: function (data1) {
                // console.log(data1);
                layer.close(loadIcon1);
                var res = $.parseJSON(data1);
                // console.log(res);
                if (res.rt == 0) {
                  layer.msg("删除成功！", {
                    icon: 0,
                    skin: "success_msg",
                    time: 3000,
                  }); // success_msg; error_msg;warn_msg;

                  that.refreshTreeNode(that.curr_node); //动态操作完成需要刷新节点&&更新数据
                } else if (res.rt == -1) {
                  //错误信息
                  layer.open({
                    title: "错误信息",
                    icon: 2,
                    content: data1.msg,
                  });
                }
              },
              error: function (xhr, type) {
                layer.close(loadIcon1);
                layer.msg("错误", { icon: 0, skin: "error_msg", time: 3000 }); // success_msg; error_msg;warn_msg;
              },
            });
            layer.close(index);
          });
        }
      }
    },
    // 预览
    preview() {
      if (this.prev_path.indexOf(".html") === -1) {
        layer.msg("只能预览html页面！", {
          icon: 0,
          skin: "warn_msg",
          time: 3000,
        }); // success_msg; error_msg;warn_msg;
      } else {
        layer.open({
          title: "预览界面",
          // title: false, // 不显示标题栏
          type: 2,
          scrollbar: true,
          area: ["98%", "98%"],
          content: "/" + this.prev_path, //
          end: function () {
            // location.reload();
          },
        });
      }
    },
  },
  watch: {
    codeType: {
      handler(newVal, oldVal) {
        // console.log(`新的值: ${newVal}`);
        // console.log(`旧的值: ${oldVal}`);
        // console.log("------------------");
        // 更改模式 //根据type 不同，动态设置 文件类型
        // 修改编辑器的语法配置
        if (newVal == "js") {
          this.editor.setOption("mode", "text/javascript");
        } else if (newVal == "css" || newVal == "less" || newVal == "map") {
          this.editor.setOption("mode", "text/css");
        } else if (newVal == "html") {
          this.editor.setOption("mode", "htmlmixed");
        }
      },
    },
  },
  mounted() {
    this.editor = CodeMirror.fromTextArea(this.$refs.code, {
      // mode: "text/javascript",
      // theme: "ambiance",
      // readOnly: true,
      lineNumbers: true,
      mode: "text/html",
      matchBrackets: true,
      // theme: "night",
      styleActiveLine: true, //代码行点击高亮
      // matchTags: { bothTags: true },//点击标签高亮
    });
  },
});
