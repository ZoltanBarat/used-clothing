import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UpdateIDContext } from '../../context/UpdateIDContext.js';
import Button from '../../elements/Button';
import ItemDataService,{ Item } from '../../services/firebase-services';
import Loading from '../Loading/Loading';

function UpdateItem() {

    const [item, setItem] = useState<Item | any>();
    const [message, setMessage] = useState({ error: false, msg: "" });
   //const [updatedItem, setUpdatedItem] = useState<Item | any>();
    const navigate = useNavigate();
    const [updateId, setUpdateId] = useContext(UpdateIDContext);

    const clothingTypes = [
        "Sweater",
        "Dress",
        "Hoodies",
        "T-shirt",
        "Flip-flops",
        "Shorts",
        "Skirt",
        "Jeans",
        "Shoes",
        "Coat",
        "High heels",
        "Suit",
        "Cap",
        "Socks",
        "Shirt",
        "Bra",
        "Scarf",
        "Swimsuit",
        "Hat",
        "Gloves",
        "Jacket",
        "Long coat",
        "Boots",
        "Sunglasses",
        "Tie",
        "Polo shirt",
        "Leather jackets",
      ];

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    setMessage({ error: false, msg: "" });

    try {
      await ItemDataService.updateItem(updateId, item);
      setMessage({ error: false, msg: "Updated successfully" });
    } catch (err: any) {
      setMessage({ error: true, msg: err.message });
    }

    navigate("/myitems");
  };



    const loadItemForUpdate = async () => {
      setMessage({ error: false, msg: "" });

      try {
        const docSnap = await ItemDataService.getItem(updateId);

        setItem({
          item: {
            name: docSnap.data()?.item.name,
            price: docSnap.data()?.item.price,
            gender: docSnap.data()?.item.gender,
            type: docSnap.data()?.item.type,
            size: docSnap.data()?.item.size,
            brand: docSnap.data()?.item.brand,
            color: docSnap.data()?.item.color,
            city: docSnap.data()?.item.city,
            description: docSnap.data()?.item.description,
          },
          imgUrl: docSnap.data()?.imgUrl,
        });
      } catch (err: any) {
        setMessage({ error: true, msg: err.message });
      }
    };


    useEffect(() => {
        loadItemForUpdate();
    }, []);
 
  
    if (item !== undefined) {
        return (
          <div className="centerContainer">
            <div className="subCenterContainer">
              <div>{message.msg}</div>
              <h2 className="AddUpMain__title">Update item</h2>
              <div className="AddUpItemWrapper">
                <div className="formContainer">
                  <form id="uppdateItemForm" onSubmit={handleSubmit}>
                    <div className="inputContainer">
                      <label>
                        Item Name
                        <input
                          required
                          className="input"
                          type="text"
                          name="name"
                          value={item.item.name}
                          onChange={(e) =>
                            setItem({
                              ...item,
                              item: { ...item.item, name: e.target.value },
                            })
                          }
                        />
                      </label>
                    </div>
                    <div className="inputContainer">
                      <label>
                        Price
                        <input
                          required
                          className="input"
                          type="text"
                          name="price"
                          placeholder="HUF"
                          value={item.item.price}
                          onChange={(e) =>
                            setItem({
                              ...item,
                              item: { ...item.item, price: e.target.value },
                            })
                          }
                        />
                      </label>
                    </div>
                    <div className="inputContainer">
                      <label>
                        Gender
                        <select
                          className="select"
                          required
                          name="gender"
                          value={item.item.gender}
                          onChange={(e) =>
                            setItem({
                              ...item,
                              item: { ...item.item, gender: e.target.value },
                            })
                          }
                        >
                          <option disabled value="DEFAULT">
                            -- select an option --
                          </option>
                          <option value="Woman">Woman</option>
                          <option value="Man">Man</option>
                        </select>
                      </label>
                    </div>

                    <div className="inputContainer">
                      <label>
                        Type
                        <input
                          className="select"
                          list="updateTypeList"
                          required
                          type="text"
                          name="type"
                          value={item.item.type}
                          onChange={(e) =>
                            setItem({
                              ...item,
                              item: { ...item.item, type: e.target.value },
                            })
                          }
                        ></input>
                        <datalist id="updateTypeList">
                          {clothingTypes.map((types, index) => (
                            <option key={index} value={types} />
                          ))}
                        </datalist>
                      </label>
                    </div>

                    <div className="inputContainer">
                      <label>
                        Size
                        <select
                          className="select"
                          required
                          name="size"
                          value={item.item.size}
                          onChange={(e) =>
                            setItem({
                              ...item,
                              item: { ...item.item, size: e.target.value },
                            })
                          }
                        >
                          <option disabled value="DEFAULT">
                            -- select an option --
                          </option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option>
                        </select>
                      </label>
                    </div>

                    <div className="inputContainer">
                      <label>
                        Brand
                        <input
                          required
                          className="input"
                          type="text"
                          name="brand"
                          placeholder="Brand name"
                          value={item.item.brand}
                          onChange={(e) =>
                            setItem({
                              ...item,
                              item: { ...item.item, brand: e.target.value },
                            })
                          }
                        />
                      </label>
                    </div>

                    <div className="inputContainer">
                      <label>
                        Color
                        <input
                          required
                          className="input"
                          type="text"
                          name="color"
                          placeholder="Item color"
                          value={item.item.color}
                          onChange={(e) =>
                            setItem({
                              ...item,
                              item: { ...item.item, color: e.target.value },
                            })
                          }
                        />
                      </label>
                    </div>

                    <div className="inputContainer">
                      <label>
                        City
                        <input
                          required
                          className="input"
                          type="text"
                          name="city"
                          placeholder="City"
                          value={item.item.city}
                          onChange={(e) =>
                            setItem({
                              ...item,
                              item: { ...item.item, city: e.target.value },
                            })
                          }
                        />
                      </label>
                    </div>
                    <div className="inputContainer">
                      <label>
                        Description
                        <textarea
                          className="textArea"
                          rows={4}
                          cols={50}
                          name="description"
                          form="usrform"
                          value={item.item.description}
                          onChange={(e) =>
                            setItem({
                              ...item,
                              item: {
                                ...item.item,
                                description: e.target.value,
                              },
                            })
                          }
                        ></textarea>
                      </label>
                    </div>
                  </form>
                </div>
                <div className="fileUpContainer">
                  <label>Picture</label>
                  <img
                    className="previewImg"
                    src={item.imgUrl}
                    alt="uploaded"
                  />
                </div>
              </div>

              <div className="button">
                <Button
                  text="Submit"
                  margin
                  type="submit"
                  form="uppdateItemForm"
                  value="submit"
                />
              </div>
            </div>
          </div>
        );
    }

    return <Loading />
}

export default UpdateItem;


/*     <div className="AddUpItemWrapper">
      <div className="formContainer">
        <form id="uppdateItemForm" onSubmit={handleSubmit}>
          <div className="inputContainer">
            <label>
              Item Name
              <input
                required
                className="input"
                type="text"
                name="name"
                placeholder="Item name"
                value={item.name}
                onChange={(e) => setItem({ ...item, name: e.target.value })}
              />
            </label>
          </div>
          <div className="inputContainer">
            <label>
              Price
              <input
                required
                className="input"
                type="text"
                name="price"
                placeholder="HUF"
                value={item.price}
                onChange={(e) => setItem({ ...item, price: e.target.value })}
              />
            </label>
          </div>
          <div className="inputContainer">
            <label>
              Gender
              <select
                className="select"
                required
                name="gender"
                value={item.gender}
                onChange={(e) => setItem({ ...item, gender: e.target.value })}
              >
                <option disabled value="DEFAULT">
                  -- select an option --
                </option>
                <option value="Woman">Woman</option>
                <option value="Man">Man</option>
              </select>
            </label>
          </div>

          <div className="inputContainer">
            <label>
              Type
              <input
                className="select"
                list="typeList"
                required
                type="text"
                name="type"
                value={item.type}
                onChange={(e) => setItem({ ...item, type: e.target.value })}
              ></input>
              <datalist id="typeList">
                {clothingTypes.map((types, index) => (
                  <option key={index} value={types} />
                ))}
              </datalist>
            </label>
          </div>

          <div className="inputContainer">
            <label>
              Size
              <select
                className="select"
                required
                name="size"
                value={item.size}
                onChange={(e) => setItem({ ...item, size: e.target.value })}
              >
                <option disabled value="DEFAULT">
                  -- select an option --
                </option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </label>
          </div>

          <div className="inputContainer">
            <label>
              Brand
              <input
                required
                className="input"
                type="text"
                name="brand"
                placeholder="Brand name"
                value={item.brand}
                onChange={(e) => setItem({ ...item, brand: e.target.value })}
              />
            </label>
          </div>

          <div className="inputContainer">
            <label>
              Color
              <input
                required
                className="input"
                type="text"
                name="color"
                placeholder="Item color"
                value={item.color}
                onChange={(e) => setItem({ ...item, color: e.target.value })}
              />
            </label>
          </div>

          <div className="inputContainer">
            <label>
              City
              <input
                required
                className="input"
                type="text"
                name="city"
                placeholder="City"
                value={item.city}
                onChange={(e) => setItem({ ...item, city: e.target.value })}
              />
            </label>
          </div>
          <div className="inputContainer">
            <label>
              Description
              <textarea
                className="textArea"
                rows={4}
                cols={50}
                name="description"
                form="usrform"
                value={item.description}
                onChange={(e) =>
                  setItem({ ...item, description: e.target.value })
                }
              >
                Enter text here...
              </textarea>
            </label>
          </div>
        </form>
      </div>
      <div className="fileUpContainer">
        <label>Picture</label>
        <div className="fileUpButton__container">
          <form>
            <label htmlFor="imgPre" className="fileUpButton">
              🗀 Choose a File...
            </label>
            {progress === "" ? (
              <input
                id="imgPre"
                required
                type="file"
                accept="image/png, image/jpeg"
                onClick={() => console.log("hellllllllllllo")}
                onChange={handleFileChange}
              />
            ) : (
              <h2>{progress}</h2>
            )}

            <Button text="Upload" disabled={!file} />
          </form>
        </div>

        {progress === "" ? null : (
          <img
            className="previewImg"
            src={file ? URL.createObjectURL(file) : "#"}
            alt="uploaded"
          />
        )}
      </div>
    </div>; */
                