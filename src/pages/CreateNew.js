import React, { useRef, useState } from "react";
import Lolly from "../components/lolly";
import Header from "../components/Header";
import { gql, useMutation, useQuery } from "@apollo/client";
import { navigate } from "gatsby";
import shortid from "shortid";
// import gql from "graphql-tag";

// const getAllData = gql`
// {
//     allAuthors {
//       id
//          name
//   }
// }
// `;

const GET_VLOLLY = gql`
{
    getVCard {
      c1,
      c2,
      c3,
      sender,
      rec,
      msg,
      link
    }
}
`;

const ADD_VCARD = gql`
  mutation addVCard(
    $c1: String!,
    $c2: String!,
    $c3: String!,
    $rec: String!,
    $sender: String!,
    $msg: String!,
    $link: String!
  ) {
    addVCard(
      c1: $c1, 
      c2: $c2, 
      c3: $c3, 
      rec: $rec, 
      sender: $sender, 
      msg: $msg,
      link: $link) 
    {
      msg
    }
  }
`

export default function Home() {
  const [c1, setC1] = useState("#deaa43")
  const [c2, setC2] = useState("#e95946")
  const [c3, setC3] = useState("#d52358")

  
  const handleSubmit = async () => {
    const slug = shortid.generate();
    console.log(senderField.current.value)
    console.log(recField.current.value)
    console.log(msgField.current.value)
    console.log("Link of virtual lolly is >>>>>>> ", slug)
    const result = await addVCard({
      variables: {
        c1,
        c2,
        c3,
        rec: recField.current.value,
        sender: senderField.current.value,
        msg: msgField.current.value,
        link: slug.toString(),
      },
      refetchQueries: [{query: GET_VLOLLY}]
    })

    console.log("Result in createNew file >>>>> ", result)

    await navigate(`/lolly/${slug}`)
  }

  
  
  const senderField = useRef()
  const recField = useRef()
  const msgField = useRef()

  

  const { loading, error, data } = useQuery(GET_VLOLLY);
  const [addVCard] = useMutation(ADD_VCARD)

  if (loading)
      return <h2>Loading..</h2>

  if (error)
      return <h2>Error</h2>

  console.log("Data in createNew lolly page >>>>>> ", data)

  return (
    <div className="container">
      <Header />
      <h1>Create Lolly</h1>
      <div className="lollyFormDiv">
        <div>
          <Lolly top={c1} middle={c2} bottom={c3} />
          <br />
        </div>

        <div className="lollyFlavourDiv">
          <label htmlFor="flavourTop" className="colorPickerLabel">
            <input
              type="color"
              className="colorPicker"
              value={c1}
              onChange={e => {
                setC1(e.target.value)
              }}
            />
          </label>

          <label htmlFor="flavourTop" className="colorPickerLabel">
            <input
              type="color"
              className="colorPicker"
              value={c2}
              onChange={e => {
                setC2(e.target.value)
              }}
            />
          </label>

          <label htmlFor="flavourTop" className="colorPickerLabel">
            <input
              type="color"
              className="colorPicker"
              value={c3}
              onChange={e => {
                setC3(e.target.value)
              }}
            />
          </label>
        </div>
        <div className="form-container">
          <input type="text" placeholder="To" ref={recField} />
          <textarea placeholder="Enter your message!" ref={msgField}></textarea>
          <input type="text" placeholder="From" ref={senderField} />
          <button onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </div>
  )
}