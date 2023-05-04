const deleteNotification = async (id, sender) => {
  const requestOptions = { method: "DELETE", redirect: "follow" };

  try {
    const response = await fetch(
      `/api/users/getNotification?id=${id}&sender=${sender}`,
      requestOptions
    );
    if (!response.ok) {
      return { statue: false };
    }
    const result = await response.json();
    if (result == "Notifications deleted successfully") {
      return { statue: true };
    }
  } catch (error) {
    return { status: false };
  }
};

export default deleteNotification;
