import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectOption } from "../../../../reducers/formSelectedOptionsReducer";
import { useState } from "react";
import { RxValue } from "react-icons/rx";
import { v4 as uuidv4 } from 'uuid';

const Component = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
`

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Label = styled.div`
`

const Input = styled.input`
`   

const Img = styled.img`
    width: 15rem;

    &.selected{
        outline: 2px solid red;
    }
`

const ImageInput = ({images, setImages}) => {
    const dispatch = useDispatch()
    const selected = useSelector(s => s.formSelected)

    const handleFileChange = (event) => {
        event.preventDefault()
    
        const files = Array.from(event.target.files)
        const renamedFiles = files.map((file, index) => {
            const newFile = new File([file], `${uuidv4()}`, { type: file.type });
            return newFile;
        })

        setImages([...images, ...renamedFiles])
    }

    const handleSelectMainImg = (event) => {
        event.preventDefault()
        
        const imgs = document.querySelectorAll('.list-img')
        const target = event.target
        const index = target.getAttribute("name")  
        console.log("index", index)
        dispatch(selectOption({prop: 'mainImgId', value: index}))
        
        imgs.forEach(img => img.classList.remove('selected'))
        target.classList.add('selected')

    }

    return(
        <div className="flex flex-col items-center w-full gap-5">
            <label className="bg-custom-blue hover:bg-custom-hover-blue cursor-pointer text-white hover-transition lg:px-2 lg:py-1 rounded-lg">Upload Images
                <input className="hidden" type="file" name="image" accept="image/*" multiple onChange={handleFileChange}/>
            </label>
            <div className="w-full grid lg:grid-cols-2 lg:gap-5">
                <h3 className="col-span-2 text-center text-lg">Images preview</h3>
                {
                    images.map((image, index) => {
                        return(
                            <div className="lg:aspect-[4/3] lg:max-w-[25rem] flex m-auto cursor-pointer hover-transform group">
                                <img className="list-img object-cover group-hover:scale-110 rounded-lg" key={index} src={URL.createObjectURL(image)}
                                    alt={`Preview ${index}`} name={image.name}  onClick={handleSelectMainImg}/>
                            </div>
                        )
                    })
                }
            </div>        
        </div>
    )
}

export default ImageInput;