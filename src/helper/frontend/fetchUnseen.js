const requestOptions = {
  method: "GET",
  redirect: "follow",
};
const fetchUnseen = async (myId, toId, setRecentMessages) => {
  try {
    const response = await fetch(
      `/api/v2/users/getNotification?sender=${myId}&type=unseen&id=${toId}`,
      requestOptions
    );
    const result = await response.json();

    if (result.msg == "Success" && result.notifications.length > 0) {
      setRecentMessages((state) => {
        return {
          ...state,
          unseenMessages: result.notifications,
        };
      });
    }
  } catch (error) {}
};

export default fetchUnseen;
