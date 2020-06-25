import React from "react";


export const PosterPreviewList = (props) => {
    const { movies=[], onMovieSelect } = props;
    const firstItemId = !!movies.length&&movies[0].id;
    const [activeElemIndex, setActiveElemIndex] = React.useState(firstItemId);

    const onItemClick = (id) => {
        return (event) => {
            onMovieSelect && onMovieSelect(id);
            setActiveElemIndex(id);
        }
    }

    return(
        <div>
            <ul className="list-group">
                {
                !!movies.length && movies.map(item => {
                    const CN = item.id === activeElemIndex? 'active': '';

                    return (
                        <li key={item.id} className={`list-group-item ${CN}`} onClick={onItemClick(item.id)}>
                            {item.original_title}
                        </li>
                    )
                })
                }
            </ul>
        </div>
    );
}











//----------------------------
// const PosterPreviewItem = (props) => {
//     const [isActive, setIsActive] = React.useState(false);
//     const { title, id, onMovieSelect } = props;
//
//     const onItemClick = (id) => {
//         return () => {
//             onMovieSelect && onMovieSelect(id);
//             setIsActive(!isActive);
//         }
//     }
//
//     return (
//         <li className={`list-group-item ${isActive && 'active'}`} onClick={onItemClick(id)}>
//             {title}
//         </li>
//     );
// }
//
//
// export const PosterPreviewList = (props) => {
//     const { movies=[], onMovieSelect } = props;
//
//     return(
//         <div>
//             <h1>PosterPreviewList</h1>
//             <ul className="list-group">
//             {
//                 !!movies.length && movies.map(item => {
//                    return (
//                       <PosterPreviewItem key={item.id} title={item.original_title} id={item.id} onMovieSelect={onMovieSelect}/>
//                    )
//                 })
//             }
//             </ul>
//         </div>
//     );
// }



//==================================
