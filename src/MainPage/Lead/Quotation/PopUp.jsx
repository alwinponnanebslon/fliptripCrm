const PopUp = () => {
  return (
    <div class="alert alert-primary" role="alert">
      A simple primary alert—check it out!
      <button
        onClick={() => {
          setIsStatusOf(true);
        }}
      >
        yes
      </button>
    </div>
  );
};

export default PopUp;
