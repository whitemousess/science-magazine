import PropTypes from "prop-types";

function ListItem({ data }) {
  return (
    <button
      onClick={data.link}
      className="w-full flex items-center px-3 py-3 text-sm cursor-pointer hover:bg-slate-200"
    >
      {data.icon}
      {data.title}
    </button>
  );
}

ListItem.propTypes = {
  data: PropTypes.object,
};

export default ListItem;
