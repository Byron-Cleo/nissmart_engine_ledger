import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  totalUsers,
  totalWalletsValue,
  totalTransfers,
  totalWithdraws,
} from "../actions/analyticsActions";
import DashIcon from "../ui/DashIcon";
import DashPill from "../ui/DashPill";
import DashCont from "../ui/DashCont";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import SpinnerMini from "../ui/SpinnerMini";
import { FcMoneyTransfer } from "react-icons/fc";
import { FcBriefcase } from "react-icons/fc";
import { FcCurrencyExchange } from "react-icons/fc";
import { FcCollaboration } from "react-icons/fc";


function Dashboard() {
  const dispatch = useDispatch();

  const [loadingTotalUsersData, setLoadingTotalUsersData] = useState(true);
  const [total, setTotal] = useState({});
  const { success: successDatalUsers, totalUsers: allUsers } = useSelector(
    (state) => state.totalUsers
  );

  const [loadingWalletBalance, setLoadingWalletBalance] = useState(true);
  const [totalWallets, setTotalWallets] = useState({});
  const { success: successDataWallets, totalWalletsValue: allWalletsAmount } =
    useSelector((state) => state.totalWalletsValue);

  const [loadingTransfers, setLoadingTransfers] = useState(true);
  const [totalTransfersAmount, setTotalTransfersAmount] = useState({});
  const { success: successDataTransfers, totalTransfers: allTransfersAmount } =
    useSelector((state) => state.totalTransfers);

  const [loadingWithdraws, setLoadingWithdraws] = useState(true);
  const [totalWithdrawAmount, setTotalWithdrawAmount] = useState({});
  const { success: successDataWithdraws, totalWithdraws: allWithdrawAmount } =
    useSelector((state) => state.totalWithdraws);

  useEffect(() => {
    if (loadingTotalUsersData) {
      dispatch(totalUsers());
    }
    if (successDatalUsers) {
      setLoadingTotalUsersData(false);
      setTotal(allUsers);
    }
  }, [dispatch, loadingTotalUsersData, successDatalUsers, allUsers]);

  useEffect(() => {
    if (loadingWalletBalance) {
      dispatch(totalWalletsValue());
    }
    if (successDataWallets) {
      setLoadingWalletBalance(false);
      setTotalWallets(allWalletsAmount);
    }
  }, [dispatch, loadingWalletBalance, successDataWallets, allWalletsAmount]);

  useEffect(() => {
    if (loadingTransfers) {
      dispatch(totalTransfers());
    }
    if (successDataTransfers) {
      setLoadingTransfers(false);
      setTotalTransfersAmount(allTransfersAmount);
    }
  }, [dispatch, loadingTransfers, successDataTransfers, allTransfersAmount]);

  useEffect(() => {
    if (loadingWithdraws) {
      dispatch(totalWithdraws());
    }
    if (successDataWithdraws) {
      setLoadingWithdraws(false);
      setTotalWithdrawAmount(allWithdrawAmount);
    }
  }, [dispatch, loadingWithdraws, successDataWithdraws, allWithdrawAmount]);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
      </Row>
      <Row type="horizontal">
        <Row type="horizontal">
          <DashPill>
            <DashIcon>
              <FcCollaboration size={60} />
            </DashIcon>
            <DashCont>
              <Heading as="h5">Total Users</Heading>
              {loadingTotalUsersData && <SpinnerMini />}
              {total ? <Heading as="h1">{total?.totalUsers}</Heading> : "--"}
            </DashCont>
          </DashPill>
        </Row>

        <Row type="horizontal">
          <DashPill>
            <DashIcon>
              <FcBriefcase size={60} />
            </DashIcon>
            <DashCont>
              <Heading as="h5">Wallets Value</Heading>
              {loadingWalletBalance && <SpinnerMini />}
              {totalWallets ? (
                <Heading as="h1">{totalWallets?.totalWalletsValue}</Heading>
              ) : (
                "--"
              )}{" "}
            </DashCont>
          </DashPill>
        </Row>

        <Row type="horizontal">
          <DashPill>
            <DashIcon>
              <FcCurrencyExchange size={60} />
            </DashIcon>
            <DashCont>
              <Heading as="h5">Total Transfers</Heading>
              {loadingWalletBalance && <SpinnerMini />}
              {totalTransfersAmount ? (
                <Heading as="h1">
                  {totalTransfersAmount?.totalTransfers}
                </Heading>
              ) : (
                "--"
              )}{" "}
            </DashCont>
          </DashPill>
        </Row>

        <Row type="horizontal">
          <DashPill>
            <DashIcon>
              <FcMoneyTransfer size={60} />
            </DashIcon>
            <DashCont>
              <Heading as="h5">Total Withdraws</Heading>
              {loadingWalletBalance && <SpinnerMini />}
              {totalWithdrawAmount ? (
                <Heading as="h1">{totalWithdrawAmount?.totalWithdraws}</Heading>
              ) : (
                "--"
              )}{" "}
            </DashCont>
          </DashPill>
        </Row>
      </Row>
    </>
  );
}

export default Dashboard;
