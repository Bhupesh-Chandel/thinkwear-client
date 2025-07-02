// import { useState, useEffect } from 'react';
// import { useAuthStore } from '../store';
// import { refreshToken } from '../http/client';
// import { logout, self } from '../http/api';
// import { useMutation } from '@tanstack/react-query';
// // import { usePermission } from './usePermission';


// // export function useLoadingWithRefresh() {
// //     const setUser = useAuthStore((state) => state.setUser);

// //     const [loading, setLoading] = useState(true);
// //     // const { isAllowed } = usePermission();

// //     let isRefreshing = false;



// //     // useEffect(() => {
// //     //     (async () => {
// //     //         if (isRefreshing) return;
// //     //         isRefreshing = true;
// //     //         try {
// //     //             await refreshToken();
// //     //             const { data } = await self();
              
// //     //                 setUser(data);
// //     //                 isRefreshing = false;
// //     //                 setLoading(false);
// //     //         } catch (err) {
// //     //             console.error("useLoadidngWithRefresh", err);
// //     //             isRefreshing = false;
// //     //             setLoading(false);
// //     //         }
// //     //     })();
// //     // }, []);

// //     // return { loading };

// //     useEffect(() => {
// //   (async () => {
// //     if (isRefreshing) return;
// //     isRefreshing = true;
// //     try {
// //       console.log("Refreshing token...");
// //       await refreshToken();
// //       console.log("Getting user...");
// //       const { data } = await self();
// //       console.log("User data:", data);

// //       setUser(data);
// //     } catch (err) {
// //       console.error("❌ useLoadingWithRefresh Error:", err);
// //     } finally {
// //       isRefreshing = false;
// //       setLoading(false);
// //     }
// //   })();
// // }, []);

// // }


// export function useLoadingWithRefresh() {
//   const setUser = useAuthStore((state) => state.setUser);
//   const [loading, setLoading] = useState(true);
//   let isRefreshing = false;

//   useEffect(() => {
//     (async () => {
//       if (isRefreshing) return;
//       isRefreshing = true;
//       try {
//         console.log("Refreshing token...");
//         await refreshToken();
//         console.log("Getting user...");
//         const { data } = await self();
//         console.log("User data:", data);

//         setUser(data);
//       } catch (err) {
//         console.error("❌ useLoadingWithRefresh Error:", err);
//       } finally {
//         isRefreshing = false;
//         setLoading(false);
//       }
//     })();
//   }, []);

//   return { loading }; // ✅ Fix: always return an object
// }
