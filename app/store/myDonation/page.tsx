import MyDonationFC from "@/components/myDination/MyDonationFC"
import CustomHeader from "@/components/ui/CustomHeader"






const MyDonation:React.FC = () => {
    return(
        <section className="py-16">
            <div className="container mx-auto px-3 5">
                <CustomHeader
                 content={{
                    title: " تبرعاتي  ",
                    description: " تابع تبرعاتك بسهولة وشفافية، تعرف على الأقسام التي دعمتها، المبالغ التي قدمتها، وتواريخ التبرع الخاصة بك، كل ذلك في مكان واحد وبطريقة مرتبة وواضحة "
                 }}
                />
                <MyDonationFC />
            </div>
        </section>
    )
}

export default MyDonation