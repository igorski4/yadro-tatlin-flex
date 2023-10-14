import { FC, useMemo, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ProductsTable from "../components/ProductsTable";
import Button from "@mui/material/Button";
import ModalEditProduct from "../components/ModalEditProduct";
import SplashScreen from "../ui/SplashScreen";
import Layout from "../layout/Layout";
import Error from "../ui/Error";
import { useMediaQuery, useTheme } from "@mui/material";

const Main: FC = () => {
  const { data, error, isLoading } = useProducts();
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState("id");

  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleChangeSorting = (event: SelectChangeEvent) => {
    setSorting(event.target.value as string);
  };

  const handlerSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filterData = useMemo(
    () => data?.filter((el) => el.name.toLocaleLowerCase().trim().includes(search.toLocaleLowerCase().trim())),
    [data, search]
  );

  const sortingData = useMemo(() => {
    if (sorting === "id") return filterData?.sort((a, b) => a.id - b.id);
    if (sorting === "name") return filterData?.sort((a, b) => a.name.localeCompare(b.name));
    if (sorting === "date")
      return filterData?.sort((a, b) => new Date(a.order_date).getTime() - new Date(b.order_date).getTime());
  }, [filterData, sorting]);

  const handleOpenChangeModal = () => setOpenModalCreate(true);
  const handleCloseCreateModal = () => setOpenModalCreate(false);

  if (isLoading) return <SplashScreen />;
  if (error) return <Error />;

  return (
    <>
      <ModalEditProduct open={openModalCreate} handleClose={handleCloseCreateModal} />

      <Layout>
        <Stack rowGap={isMobile ? 1 : 2} direction={"column"} width={"100%"}>
          <Stack columnGap={4} rowGap={2} direction={isMobile ? "column" : "row"}>
            <TextField
              id="search"
              label="Search"
              variant="filled"
              sx={{ flexGrow: 1 }}
              value={search}
              size={isMobile ? "small" : "medium"}
              onChange={handlerSearch}
            />
            <FormControl
              sx={{
                flexBasis: isMobile ? "100%" : "500px",
              }}
            >
              <InputLabel id="sorting-label">Sorting</InputLabel>
              <Select
                labelId="sorting"
                id="sorting"
                value={sorting}
                label="Sorting"
                variant="filled"
                size={isMobile ? "small" : "medium"}
                onChange={handleChangeSorting}
              >
                <MenuItem value={"id"}>Id</MenuItem>
                <MenuItem value={"name"}>Name</MenuItem>
                <MenuItem value={"date"}>Date</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <ProductsTable data={sortingData} />
          <Button onClick={handleOpenChangeModal} variant={"contained"} size={"large"} sx={{ alignSelf: "flex-end" }}>
            Create product
          </Button>
        </Stack>
      </Layout>
    </>
  );
};

export default Main;
