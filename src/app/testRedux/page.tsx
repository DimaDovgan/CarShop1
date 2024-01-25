"use client";

import { decrement, increment, reset } from "../GlobalRedux/feature/authSlice";
import { useAppDispatch, useAppSelector } from "../GlobalRedux/hooks";
import { useGetUsersQuery } from "../GlobalRedux/services/userApi";

export default function Home() {
  const count = useAppSelector((state) => state.counterReducer.value);
  const dispatch = useAppDispatch();
  const { isLoading, isFetching, data, error } = useGetUsersQuery(null);
  console.log("data",data)

  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
        
      <div style={{ marginBottom: "4rem", textAlign: "center" }}>
        <h4 style={{ marginBottom: 16 }}>{count}</h4>
        <button onClick={() => dispatch(increment())}>increment</button>
        <button
          onClick={() => dispatch(decrement())}
          style={{ marginInline: 16 }}
        >
          decrement
        </button>
        <button onClick={() => dispatch(reset())}>reset</button>
      </div>
    </main>
  );
}