export default {
  getQuote(ctx){
    // Here you would make a request to your server

    // return ctx.$http.get('http://yourserver.com/api', function (data, status, request) {
    //       return data;
    //   }).error(function (data, status, request) {
    //       return data;
    //   })
    return {
      quote: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut"
    }
  }
}
