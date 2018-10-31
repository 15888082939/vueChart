import { getListApi} from "@/api/getList";

const actions = {
  getApplist({ commit }) {
    return new Promise((resolve, reject) => {
      getListApi()
          .then(
              response => {
                resolve(response.data);
              },
              error => {
                  reject(error);
              }
          )
          .catch(error => {
              reject(error);
          });
  });
  },
}
export default actions;
