const transformMessages = (list) => {
  return list.map((message, index) => {
    const role = index % 2 === 0 ? "user" : "assistant";
    return {
      role: role,
      content: message,
    };
  });
};

module.exports = transformMessages;
