import request from "@/js/request";
export function getListApi() {
  // const data = {
  //   name: params.name || ""
  // };
  return request({
    url: "/list",
    method: "post",
  });
}
