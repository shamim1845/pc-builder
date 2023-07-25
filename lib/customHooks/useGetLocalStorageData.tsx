const useGetLocalStorageData = (key: string) => {
  if (typeof window === "object") {
    const localData = localStorage.getItem(key);
    const data = localData && JSON.parse(localData);
    return data;
  }
};

export default useGetLocalStorageData;
