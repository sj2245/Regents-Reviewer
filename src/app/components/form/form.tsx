// export default function Form({
//   title = `Form`,
//   className = `form`,
// }) {
//   return (
//     <div className={`formGroup container`}>
//       <h3 className={`formTitle`}>{title}</h3>
//       <form className={`${className}Form container`} onSubmit={(e) => onSignUp(e)}>
//         <input type={`email`} name={`email`} placeholder={`Enter Email`} />
//         <input type={`password`} name={`password`} placeholder={`Enter Password`} />
//         <button type={`submit`}>
//           {title}
//         </button>
//       </form>
//     </div>
//   )
// }