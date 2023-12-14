import styled, { RuleSet, css } from "styled-components";
import React, { useState, useCallback } from "react";
import DropDownArrow from "@/assets/icons/dropDownArrow.svg?react";

interface DropdownProps {
  name: string;
  variant?: "normal";
  list: string[];
  style?: React.CSSProperties;
  defaultIndex?: number;
  onItemSelected?: (index: number, item: string) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

interface CustomProperties {
  $variantStyle?: RuleSet<object>;
}

interface SelectItemStyleProps {
  $isSelected: boolean;
}
interface SelectItemWrapperProps {
  $isOpen: boolean;
}
interface SelectedItemWrapperProps {
  $isOpen: boolean;
}

const VARIANTS = {
  normal: css`
    border: 1px solid var(--color-gray-200, #ddd);
  `,
};

// TODO : 공용 컴포넌트에 맞게 다시 리팩토링
const Dropdown = ({
  name,
  variant = "normal",
  list,
  style,
  defaultIndex = 0,
  onItemSelected,
  onOpen,
  onClose,
}: DropdownProps) => {
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const [isOpen, setIsOpen] = useState(false);

  const variantStyle = VARIANTS[variant] || VARIANTS.normal;

  const handleDropdownClick = useCallback(() => {
    setIsOpen(!isOpen);
    if (isOpen) {
      if (onOpen) {
        onOpen();
      }
    } else if (onClose) {
      onClose();
    }
  }, [isOpen, onOpen, onClose]);

  const handleItemClick = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      setIsOpen(false);
      if (onItemSelected) {
        onItemSelected(index, list[index]);
      }
    },
    [list, onItemSelected],
  );

  return (
    <DropdownLayer onClick={handleDropdownClick} $variantStyle={variantStyle} style={style} aria-expanded={isOpen}>
      <SelectedItemWrapper $isOpen={isOpen}>
        <span>{list[currentIndex]}</span>
        <DropDownArrow />
      </SelectedItemWrapper>
      {isOpen && (
        <SelectItemWrapper $isOpen={isOpen} style={{ display: isOpen ? "flex" : "none" }}>
          {list.map((item, idx) => {
            const key = `${name}-${idx}`;
            return (
              <SelectItemStyle key={key} onClick={() => handleItemClick(idx)} $isSelected={idx === currentIndex}>
                {item}
              </SelectItemStyle>
            );
          })}
        </SelectItemWrapper>
      )}
    </DropdownLayer>
  );
};

export default Dropdown;

const DropdownLayer = styled.div<CustomProperties>`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem 1.4rem;
  border-radius: 1px;
  cursor: pointer;
  ${(props) => props.$variantStyle}
`;

const SelectedItemWrapper = styled.div<SelectedItemWrapperProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  svg {
    transition: all ease-in-out 0.14s;
    transform: ${(props) => (props.$isOpen ? `rotate(180deg)` : `none`)};
  }
`;

const SelectItemWrapper = styled.div<SelectItemWrapperProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 105%;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  overflow: hidden;
`;

const SelectItemStyle = styled.div<SelectItemStyleProps>`
  display: flex;
  align-items: center;
  padding: 0.5rem 1.4rem;
  height: 4rem;
  color: ${(props) => (props.$isSelected ? `var(--color-sub-500)` : `inherit`)};
  font-weight: ${(props) => (props.$isSelected ? `var(--weight-bold)` : `inherit`)};
  &:hover {
    background-color: var(--color-sub-500);
    color: var(--color-white);
  }
`;
