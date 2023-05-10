export const MessageActions = {
  postMessage: "POST_MESSAGE",
};

export const MessageReducer = (state, action) => {
  switch (action.type) {
    case MessageActions.postMessage:
      sendMessage(action.payload);
      break;
    default:
      return state;
  }
};

export const MessageDispatch = (action) => {
  MessageReducer(null, action);
};

const sendMessage = async ({
  senderEmail,
  receiverEmail,
  messages,
  setMessages,
  setRecentMessages,
}) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      senderEmail: senderEmail,
      receiverEmail: receiverEmail,
      body: messages,
    }),
    redirect: "follow",
  };

  try {
    var response = await fetch(
      "http://localhost:3000/api/messages",
      requestOptions
    );
    var result = await response.json();
    setRecentMessages((state) => {
      return { ...state, messages: [...state.messages, result] };
    });
  } catch (error) {
    setMessages(error.message);
  }
};

export const getMessages = async (senderId, receiverId, setRecentMessages) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  try {
    const response = await fetch(
      `/api/messages?senderId=${senderId}&receiverId=${receiverId}`,
      requestOptions
    );
    const result = await response.json();

    if (result) {
      setRecentMessages((state) => {
        return { ...state, messages: result.messages };
      });
    } else {
      setRecentMessages((state) => {
        return { ...state, messages: [] };
      });
    }
  } catch (error) {
    console.log(error);
  }
};
