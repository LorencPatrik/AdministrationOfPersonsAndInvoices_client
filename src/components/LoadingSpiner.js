function LoadingSpiner({ size }) {

    return (
        <div className="text-center my-3">
            <div className="spinner-border text-primary" role="status"
                style={{ width: size + 'rem', height: size + 'rem' }}>
                <span className="visually-hidden">Načítám data...</span>
            </div>
        </div>
    )
}

export default LoadingSpiner;